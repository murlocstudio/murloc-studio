import { createServerSupabaseClient } from '@/lib/supabase/server';
import { fallbackBundle, initialSiteSettings, initialStudioRooms, initialEquipment, initialServices, initialPortfolio } from './mock-data';
import { StudioDataBundle, SiteSettings, StudioRoom, Equipment, StudioService, PortfolioArtist } from '@/types/database';

export async function getStudioData(): Promise<StudioDataBundle> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return fallbackBundle;
    }

    const [
      settingsRes,
      roomsRes,
      equipmentRes,
      servicesRes,
      portfolioRes,
    ] = await Promise.allSettled([
      supabase.from('site_settings').select('*').limit(1).maybeSingle(),
      supabase.from('studio_rooms').select('*').order('order_index', { ascending: true }),
      supabase.from('equipment').select('*').order('order_index', { ascending: true }),
      supabase.from('services').select('*').order('order_index', { ascending: true }),
      supabase.from('portfolio_artists').select('*').order('order_index', { ascending: true }),
    ]);

    const settings = settingsRes.status === 'fulfilled' && settingsRes.value.data ? (settingsRes.value.data as SiteSettings) : initialSiteSettings;
    const rooms = roomsRes.status === 'fulfilled' && roomsRes.value.data && roomsRes.value.data.length > 0 ? (roomsRes.value.data as StudioRoom[]) : initialStudioRooms;
    const equipment = equipmentRes.status === 'fulfilled' && equipmentRes.value.data && equipmentRes.value.data.length > 0 ? (equipmentRes.value.data as Equipment[]) : initialEquipment;
    const services = servicesRes.status === 'fulfilled' && servicesRes.value.data && servicesRes.value.data.length > 0 ? (servicesRes.value.data as StudioService[]) : initialServices;
    const portfolio = portfolioRes.status === 'fulfilled' && portfolioRes.value.data && portfolioRes.value.data.length > 0 ? (portfolioRes.value.data as PortfolioArtist[]) : initialPortfolio;

    return {
      settings,
      rooms,
      equipment,
      services,
      portfolio,
    };
  } catch (error) {
    console.error('Error fetching studio data, using fallback bundle:', error);
    return fallbackBundle;
  }
}
