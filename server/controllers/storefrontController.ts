import type { Request, Response } from 'express';
import { getDatabaseStatus } from '../config/db.ts';
import {
  DEMO_CATEGORIES,
  DEMO_HERO_SLIDES,
  DEMO_METAL_RATES,
  DEMO_PRODUCTS,
  DEMO_TESTIMONIALS,
} from '../utils/demoHomeData.ts';

const demoNewsletterSubscribers = new Set<string>();

export function getHomeShowcase(_req: Request, res: Response) {
  const db = getDatabaseStatus();

  res.status(200).json({
    success: true,
    isDemoFallback: !db.connected,
    databaseMode: db.mode,
    heroSlides: DEMO_HERO_SLIDES,
    categories: DEMO_CATEGORIES,
    products: DEMO_PRODUCTS,
    metalRates: DEMO_METAL_RATES,
    testimonials: DEMO_TESTIMONIALS,
  });
}

export function subscribeNewsletter(req: Request, res: Response) {
  const rawEmail = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!rawEmail || !emailRegex.test(rawEmail)) {
    res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.',
    });
    return;
  }

  const alreadySubscribed = demoNewsletterSubscribers.has(rawEmail);
  demoNewsletterSubscribers.add(rawEmail);

  res.status(200).json({
    success: true,
    alreadySubscribed,
    email: rawEmail,
    message: alreadySubscribed
      ? 'You are already subscribed to our demonstration atelier updates.'
      : 'Thank you for subscribing to Your Brand demonstration updates.',
    mode: getDatabaseStatus().mode,
  });
}
