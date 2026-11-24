import axios from 'axios';

export interface DatabaseHealth {
  mode: 'mongodb-atlas' | 'demo-fallback';
  connected: boolean;
  readyState: number;
  readyStateLabel: string;
  configured: boolean;
  message: string;
  lastCheckedAt: string;
}

export interface MetalRatesPreview {
  isDemonstrationRate: boolean;
  updatedAt: string;
  gold24kPerGram: number;
  gold22kPerGram: number;
  silver925PerGram: number;
  sampleGstPercent: number;
}

export interface HealthResponse {
  success: boolean;
  service: string;
  milestone: string;
  environment: string;
  uptimeSeconds: number;
  timestamp: string;
  database: DatabaseHealth;
  features: {
    cloudinaryConfigured: boolean;
    sampleImageFallbackActive: boolean;
    demoMetalRates: MetalRatesPreview;
  };
}

export interface HeroSlide {
  id: string;
  kicker: string;
  kickerTe: string;
  headline: string;
  headlineTe: string;
  description: string;
  descriptionTe: string;
  ctaLabel: string;
  ctaLabelTe: string;
  ctaTo: string;
  image: string;
  alt: string;
}

export interface StoreCategory {
  id: string;
  name: string;
  nameTe: string;
  slug: string;
  group: 'Jewellery' | 'Sarees' | 'Fashion';
  tagline: string;
  taglineTe: string;
  itemCount: number;
  image: string;
  route: string;
}

export interface StoreProduct {
  id: string;
  sku: string;
  name: string;
  nameTe: string;
  slug: string;
  category: string;
  categoryGroup: 'Jewellery' | 'Sarees' | 'Fashion';
  material: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  stock: number;
  tag: string;
  sections: string[];
  image: string;
  shortDescription: string;
}

export interface StoreTestimonial {
  id: string;
  name: string;
  city: string;
  itemPurchased: string;
  quote: string;
  isDemoContent: boolean;
}

export interface HomeShowcaseResponse {
  success: boolean;
  isDemoFallback: boolean;
  databaseMode: 'mongodb-atlas' | 'demo-fallback';
  heroSlides: HeroSlide[];
  categories: StoreCategory[];
  products: StoreProduct[];
  metalRates: MetalRatesPreview;
  testimonials: StoreTestimonial[];
}

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchHealthStatus(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>('/health');
  return data;
}

export async function fetchHomeShowcase(): Promise<HomeShowcaseResponse> {
  const { data } = await apiClient.get<HomeShowcaseResponse>('/storefront/home');
  return data;
}

export async function subscribeNewsletter(email: string): Promise<{
  success: boolean;
  alreadySubscribed: boolean;
  email: string;
  message: string;
}> {
  const { data } = await apiClient.post('/storefront/newsletter', { email });
  return data;
}
