'use client';

import React, { useState, useEffect } from 'react';
import { ContactInquiry } from '@/types/database';
import { Phone, Mail, Calendar, MessageSquare, CheckCircle, Clock, Trash2, Search } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export const InquiriesEditor: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([
    {
      id: 'inq-1',
      full_name: 'Ahmet Karaca (Nova Band)',
      email: 'ahmet@novaband.com',
      phone: '+90 532 111 2233',
      studio_room_interested: 'Studio A (Main Live Room & SSL Console)',
      service_interested: 'Müzik ve Vokal Kaydı',
      preferred_date: '2026-10-15',
      message: '4 kişilik rock grubumuz için 2 günlük canlı hücum kayıt ve davul kaydı seansı planlıyoruz.',
      status: 'new',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'inq-2',
      full_name: 'Zeynep Demir',
      email: 'zeynep.demir@podcasttr.com',
      phone: '+90 544 987 6543',
      studio_room_interested: 'Studio C (Mixing, Mastering & Podcast)',
      service_interested: 'Podcast & Seslendirme Prodüksiyonu',
      preferred_date: '2026-10-18',
      message: 'Haftalık ekonomi podcastimiz için 4 kameralı 4K stüdyo kaydı ve kurgu hizmeti almak istiyoruz.',
      status: 'in_review',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    async function loadInquiries() {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        if (supabase) {
          setLoading(true);
          const { data } = await supabase
            .from('contact_inquiries')
            .select('*')
            .order('created_at', { ascending: false });
          if (data && data.length > 0) {
            setInquiries(data as ContactInquiry[]);
          }
          setLoading(false);
        }
      }
    }
    loadInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: ContactInquiry['status']) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('contact_inquiries').update({ status: newStatus }).eq('id', id);
      }
    }
    setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)));
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Bu rezervasyon kaydını silmek istediğinize emin misiniz?')) return;
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('contact_inquiries').delete().eq('id', id);
      }
    }
    setInquiries(inquiries.filter((inq) => inq.id !== id));
  };

  const filtered = inquiries.filter((inq) => {
    if (statusFilter === 'all') return true;
    return inq.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-zinc-950 font-display">Gelen Rezervasyon & İletişim Talepleri</h3>
          <p className="text-xs text-zinc-500">Form üzerinden iletilen potansiyel müşteri ve seans başvuruları</p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'new', 'in_review', 'confirmed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {st === 'all' ? 'Tümü' : st === 'new' ? 'Yeni' : st === 'in_review' ? 'İnceleniyor' : 'Onaylandı'}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filtered.map((inq) => {
          const whatsappUrl = `https://wa.me/${inq.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
            `Merhaba ${inq.full_name}, Murloc Studio rezervasyon talebiniz hakkında iletişime geçiyorum.`
          )}`;

          return (
            <div
              key={inq.id}
              className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-subtle space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-900 text-xs font-mono">
                    {inq.full_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950">{inq.full_name}</h4>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {new Date(inq.created_at).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value as ContactInquiry['status'])}
                    className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50"
                  >
                    <option value="new">Yeni Talep</option>
                    <option value="in_review">İnceleniyor</option>
                    <option value="confirmed">Onaylandı</option>
                    <option value="archived">Arşivlendi</option>
                  </select>

                  <button
                    onClick={() => deleteInquiry(inq.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-zinc-100"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Badges / Interested in */}
              <div className="flex flex-wrap gap-2 text-xs">
                {inq.studio_room_interested && (
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-800 font-mono text-[11px]">
                    🏠 {inq.studio_room_interested}
                  </span>
                )}
                {inq.service_interested && (
                  <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-mono text-[11px]">
                    🎵 {inq.service_interested}
                  </span>
                )}
                {inq.preferred_date && (
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-mono text-[11px]">
                    📅 Tarih: {inq.preferred_date}
                  </span>
                )}
              </div>

              {/* Message text */}
              <div className="p-4 bg-zinc-50 rounded-2xl text-xs text-zinc-700 leading-relaxed">
                {inq.message}
              </div>

              {/* Direct Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${inq.phone}`}
                  className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold flex items-center gap-1.5 transition-colors font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-600" />
                  <span>{inq.phone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp'tan Yaz</span>
                </a>

                <a
                  href={`mailto:${inq.email}`}
                  className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{inq.email}</span>
                </a>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200">
            <p className="text-xs text-zinc-500">Bu filtrelere uygun rezervasyon talebi bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};
