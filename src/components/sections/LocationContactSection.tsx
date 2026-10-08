'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings, StudioRoom, StudioService } from '@/types/database';
import { submitContactInquiry } from '@/lib/data/client-api';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ArrowUpRight, Loader2 } from 'lucide-react';

interface LocationContactSectionProps {
  settings: SiteSettings;
  rooms: StudioRoom[];
  services: StudioService[];
  prefilledMessage?: string;
}

export const LocationContactSection: React.FC<LocationContactSectionProps> = ({
  settings,
  rooms,
  services,
  prefilledMessage,
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    studio_room_interested: '',
    service_interested: '',
    preferred_date: '',
    message: '',
  });

  useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await submitContactInquiry(formData);
    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        studio_room_interested: '',
        service_interested: '',
        preferred_date: '',
        message: '',
      });
    } else {
      setErrorMsg('Bir hata oluştu. Lütfen doğrudan WhatsApp ile iletişime geçiniz.');
    }
  };

  const whatsappLink = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
    'Merhaba Murloc Music Studio, stüdyo seansı / prova rezervasyonu hakkında bilgi almak istiyorum.'
  )}`;

  return (
    <section id="location" className="py-24 bg-[#0F1012] text-[#FAF8F5] border-t border-white/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E26D4B] font-bold">
            ANKARA / KAVAKLIDERE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-[#FAF8F5]">
            Konum & Randevu
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#FAF8F5]/70 pt-1">
            Tunus Caddesi'ndeki stüdyomuz için rezervasyon talebinizi iletebilir veya WhatsApp'tan yazabilirsiniz.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Map & Quick Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Embedded Google Map */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#16171A] border border-white/10 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.1023456789!2d32.8550123!3d39.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f9a00000000%3A0x0!2sTunus+Cd.+No%3A14%2C+%C3%87ankaya%2FAnkara!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Murloc Music Studio Tunus Caddesi Konumu"
                className="w-full h-full grayscale invert contrast-125 hover:grayscale-0 hover:invert-0 transition-all duration-500"
              />
            </div>

            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#16171A] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#FAF8F5] font-bold text-xs font-mono uppercase">
                  <MapPin className="w-4 h-4 text-[#E26D4B] shrink-0" />
                  <span>Adres</span>
                </div>
                <p className="text-xs font-mono text-[#FAF8F5]/70 leading-relaxed">
                  {settings.address || 'Kavaklıdere Mah. Tunus Cad. No: 14/5, Çankaya / Ankara'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#16171A] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#FAF8F5] font-bold text-xs font-mono uppercase">
                  <Clock className="w-4 h-4 text-[#4A8B9E] shrink-0" />
                  <span>Çalışma Saatleri</span>
                </div>
                <p className="text-xs font-mono text-[#FAF8F5]/70 leading-relaxed">
                  {settings.working_hours || 'Pazartesi - Pazar: 10:00 - 02:00'}
                </p>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#E26D4B] text-white hover:bg-[#c95b3b] transition-all shadow-glow"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-90">
                    HIZLI WHATSAPP HATTI
                  </div>
                  <div className="text-sm font-bold font-mono">Tek Tıkla Mesaj Gönderin</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Reservation Form */}
          <div id="contact" className="lg:col-span-7 bg-[#16171A] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="space-y-1 mb-6">
              <h3 className="text-2xl font-bold uppercase font-display text-[#FAF8F5]">
                Seans / Prova Rezervasyon Formu
              </h3>
              <p className="text-xs font-mono text-[#FAF8F5]/60">
                Talebinizi iletin, müsaitlik durumunu kontrol edip en kısa sürede dönüş yapalım.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-950/30 rounded-2xl border border-emerald-600/40">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold font-mono text-[#FAF8F5]">Rezervasyon Talebiniz Alındı</h4>
                <p className="text-xs font-mono text-[#FAF8F5]/70 max-w-md mx-auto">
                  Teşekkür ederiz! Talebiniz stüdyomuza iletildi. En kısa sürede telefon veya WhatsApp ile sizinle irtibata geçeceğiz.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  Yeni Bir Talep Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {errorMsg && (
                  <div className="p-3 bg-red-950/40 text-red-400 rounded-xl border border-red-800">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/70 font-semibold">
                      Ad Soyad / Grup Adı *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Örn: Tunus Band"
                      className="w-full px-4 py-2.5 bg-[#0F1012] border border-white/10 rounded-xl focus:outline-none focus:border-[#E26D4B] text-[#FAF8F5]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/70 font-semibold">
                      Telefon / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0530 000 00 00"
                      className="w-full px-4 py-2.5 bg-[#0F1012] border border-white/10 rounded-xl focus:outline-none focus:border-[#E26D4B] text-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/70 font-semibold">
                      Hizmet / Seans Türü
                    </label>
                    <select
                      value={formData.service_interested}
                      onChange={(e) => setFormData({ ...formData, service_interested: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0F1012] border border-white/10 rounded-xl focus:outline-none focus:border-[#E26D4B] text-[#FAF8F5]"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Grup Prova">Grup Prova Seansı (500 ₺/s)</option>
                      <option value="Canlı Hücum Kayıt">Canlı Hücum / Kanal Kayıt (1.000 ₺/s)</option>
                      <option value="Bireysel Çalışma">Derslik / Bireysel Çalışma (350 ₺/s)</option>
                      <option value="Mixing & Mastering">Mixing & Mastering</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/70 font-semibold">
                      Tercih Edilen Tarih
                    </label>
                    <input
                      type="date"
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0F1012] border border-white/10 rounded-xl focus:outline-none focus:border-[#E26D4B] text-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/70 font-semibold">
                    Notunuz / Seans Detayları
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Kaç saatlik seans düşünüyorsunuz, hangi saatler aralığı uygun?"
                    className="w-full px-4 py-2.5 bg-[#0F1012] border border-white/10 rounded-xl focus:outline-none focus:border-[#E26D4B] text-[#FAF8F5]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#E26D4B] hover:bg-[#c95b3b] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-glow flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>İletiliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Rezervasyon Talebi Gönder</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
