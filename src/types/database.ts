export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface SiteSettings {
  id: string;
  site_title: string;
  site_tagline: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_image_url: string;
  story_title: string;
  story_narrative: string;
  story_image_url: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  google_maps_iframe?: string;
  google_maps_url?: string;
  working_hours: string;
  instagram_url: string;
  spotify_url: string;
  youtube_url: string;
  seo_keywords: string;
  is_booking_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface StudioRoom {
  id: string;
  name: string;
  slug: string;
  short_tag: string;
  description: string;
  size_sqm: number;
  acoustic_specs: {
    rt60?: string;
    isolation?: string;
    flooring?: string;
    ceiling_height?: string;
    monitoring?: string;
    [key: string]: string | undefined;
  };
  features: string[];
  images: string[];
  primary_image: string;
  hourly_rate_info: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Equipment {
  id: string;
  studio_room_id?: string | null;
  name: string;
  brand: string;
  category: 'Microphones' | 'Monitoring' | 'Outboard & Preamps' | 'Instruments & Amplifiers' | 'DAW & Converters' | string;
  specs?: string | null;
  is_rentable: boolean;
  rental_daily_price?: string | null;
  image_url?: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface StudioService {
  id: string;
  title: string;
  category: 'Production' | 'Post-Production' | 'Broadcasting' | 'Rental' | string;
  short_description: string;
  description: string;
  deliverables: string[];
  is_rental: boolean;
  price_info: string;
  badge_text?: string | null;
  icon_name?: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioArtist {
  id: string;
  artist_name: string;
  project_title: string;
  genre: string;
  role_description?: string;
  image_url: string;
  release_year: number;
  stream_url?: string | null;
  preview_audio_url?: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service_interested?: string;
  studio_room_interested?: string;
  preferred_date?: string;
  message: string;
  status: 'new' | 'in_review' | 'confirmed' | 'archived';
  created_at: string;
}

export interface StudioDataBundle {
  settings: SiteSettings;
  rooms: StudioRoom[];
  equipment: Equipment[];
  services: StudioService[];
  portfolio: PortfolioArtist[];
}
