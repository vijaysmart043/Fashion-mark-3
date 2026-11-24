import type { Request, Response } from 'express';
import { getDatabaseStatus } from '../config/db.ts';
import { env } from '../config/env.ts';
import { DEMO_METAL_RATES } from '../utils/demoHomeData.ts';

export function getHealthStatus(_req: Request, res: Response) {
  const db = getDatabaseStatus();

  res.status(200).json({
    success: true,
    service: 'your-brand-mern-api',
    milestone: 'Milestone 1 — Project Foundation',
    environment: env.nodeEnv,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    database: db,
    features: {
      cloudinaryConfigured: Boolean(
        env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret,
      ),
      sampleImageFallbackActive: true,
      demoMetalRates: DEMO_METAL_RATES,
    },
  });
}
