import mongoose from 'mongoose';
import { env } from './env.ts';

export type DatabaseMode = 'mongodb-atlas' | 'demo-fallback';

export interface DatabaseStatus {
  mode: DatabaseMode;
  connected: boolean;
  readyState: number;
  readyStateLabel: string;
  configured: boolean;
  message: string;
  lastCheckedAt: string;
}

const READY_STATE_LABELS: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

let connectionNote = 'MONGODB_URI not configured; running in Demo Fallback Mode.';

export async function connectDatabase(): Promise<DatabaseStatus> {
  if (!env.mongodbUri) {
    connectionNote =
      'MONGODB_URI is not set. Running in clearly labelled Demo Fallback Mode with sample storefront data.';
    return getDatabaseStatus();
  }

  try {
    await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });
    connectionNote = 'Connected to MongoDB Atlas.';
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown connection error';
    connectionNote = `MongoDB Atlas unavailable (${reason}). Falling back to Demo Fallback Mode.`;
  }

  return getDatabaseStatus();
}

export function getDatabaseStatus(): DatabaseStatus {
  const readyState = mongoose.connection.readyState;
  const connected = readyState === 1;
  return {
    mode: connected ? 'mongodb-atlas' : 'demo-fallback',
    connected,
    readyState,
    readyStateLabel: READY_STATE_LABELS[readyState] || 'unknown',
    configured: Boolean(env.mongodbUri),
    message: connected ? 'Connected to MongoDB Atlas.' : connectionNote,
    lastCheckedAt: new Date().toISOString(),
  };
}
