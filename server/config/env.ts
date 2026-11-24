import crypto from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const ephemeralJwtSecret = crypto.randomBytes(32).toString('hex');

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  mongodbUri: (process.env.MONGODB_URI || '').trim(),
  jwtSecret: (process.env.JWT_SECRET || '').trim() || ephemeralJwtSecret,
  clientUrl: (process.env.CLIENT_URL || 'http://localhost:3000').trim(),
  appUrl: (process.env.APP_URL || '').trim(),
  cloudinary: {
    cloudName: (process.env.CLOUDINARY_CLOUD_NAME || '').trim(),
    apiKey: (process.env.CLOUDINARY_API_KEY || '').trim(),
    apiSecret: (process.env.CLOUDINARY_API_SECRET || '').trim(),
  },
};
