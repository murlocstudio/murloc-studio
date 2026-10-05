import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { ContactInquiry } from '@/types/database';

// Client-side helper to submit inquiry
export async function submitContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>) {
  try {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase.from('contact_inquiries').insert([inquiry]).select();
        if (error) throw error;
        return { success: true, data };
      }
    }
    // Fallback simulated success
    return { success: true, message: 'Talebiniz başarıyla alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.' };
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return { success: false, error };
  }
}
