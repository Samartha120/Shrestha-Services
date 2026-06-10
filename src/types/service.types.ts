export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category?: string;
  basePrice?: number;
  materials?: string[];
  features?: string[];
}