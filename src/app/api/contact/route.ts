import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, message, studio_room_interested, service_interested, preferred_date } = body;

    if (!full_name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Lütfen zorunlu alanları (ad, e-posta, telefon, mesaj) doldurunuz.' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('contact_inquiries').insert([
        {
          full_name,
          email,
          phone,
          message,
          studio_room_interested: studio_room_interested || null,
          service_interested: service_interested || null,
          preferred_date: preferred_date || null,
          status: 'new',
        },
      ]).select();

      if (error) {
        console.error('Database inquiry error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Rezervasyon talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Bir sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
