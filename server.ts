import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import helmet from 'helmet';
import { createServer as createViteServer } from 'vite';
import { connectDatabase } from './server/config/db.ts';
import { env } from './server/config/env.ts';
import { errorHandler, notFoundHandler } from './server/middleware/errorHandler.ts';
import { apiRateLimiter } from './server/middleware/rateLimiter.ts';
import healthRoutes from './server/routes/healthRoutes.ts';
import storefrontRoutes from './server/routes/storefrontRoutes.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function bootstrap() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      frameguard: false,
    }),
  );

  const allowedOrigins = new Set(
    [env.clientUrl, env.appUrl, 'http://localhost:3000', 'http://localhost:5173'].filter(Boolean),
  );

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }
        try {
          const parsed = new URL(origin);
          if (
            allowedOrigins.has(origin) ||
            parsed.hostname === 'localhost' ||
            parsed.hostname === '127.0.0.1' ||
            parsed.hostname.endsWith('.run.app')
          ) {
            callback(null, true);
            return;
          }
        } catch {
          // Invalid origin URL
        }
        callback(new Error('Origin not allowed by CORS'));
      },
      credentials: true,
    }),
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', apiRateLimiter);
  app.use('/api/health', healthRoutes);
  app.use('/api/storefront', storefrontRoutes);

  app.use('/api', notFoundHandler);

  if (env.nodeEnv !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.use(errorHandler);

  const dbStatus = await connectDatabase();

  app.listen(env.port, '0.0.0.0', () => {
    console.log(
      `[Your Brand MERN] Server listening on http://0.0.0.0:${env.port} (${env.nodeEnv}) — DB mode: ${dbStatus.mode}`,
    );
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
