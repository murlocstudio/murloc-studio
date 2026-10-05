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
      setErrorMsg('Bir hata oluştu. Lütfen doğrudan WhatsApp veya telefon ile iletişime geçiniz.');
    }
  };

  const whatsappLink = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
    'Merhaba Murloc Studio, stüdyo kiralama ve kayıt seansı hakkında bilgi almak istiyorum.'
  )}`;

  return (
    <section id="location" className="py-24 bg-zinc-50 border-t border-zinc-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              Merkezi Konum & Randevu
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-display tracking-tight">
            Konum, Çalışma Saatleri & Rezervasyon
          </h2>
          <p className="text-base sm:text-lg text-zinc-600">
            Beşiktaş'taki stüdyomuzu ziyaret edebilir veya seans rezervasyonunuzu hemen oluşturabilirsiniz.
          </p>
        </div>

        {/* 2-Column Grid: Left Map & Direct Contact, Right Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Map & Quick Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Embedded Google Map */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-200 border border-zinc-300 shadow-sm">
              <iframe
                src={settings.google_maps_iframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Murloc Studio Konumu"
                className="w-full h-full grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Quick Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-1">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs font-mono uppercase">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Adres</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{settings.address}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-1">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs font-mono uppercase">
                  <Clock className="w-4 h-4 text-zinc-700 shrink-0" />
                  <span>Çalışma Saatleri</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{settings.working_hours}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-1">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs font-mono uppercase">
                  <Phone className="w-4 h-4 text-zinc-700 shrink-0" />
                  <span>Telefon</span>
                </div>
                <a href={`tel:${settings.phone}`} className="text-xs text-zinc-900 font-semibold font-mono hover:text-red-600 block">
                  {settings.phone}
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-1">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs font-mono uppercase">
                  <Mail className="w-4 h-4 text-zinc-700 shrink-0" />
                  <span>E-Posta</span>
                </div>
                <a href={`mailto:${settings.email}`} className="text-xs text-zinc-900 font-semibold font-mono hover:text-red-600 block truncate">
                  {settings.email}
                </a>
              </div>
            </div>

            {/* WhatsApp Quick CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs font-mono uppercase tracking-wider font-semibold opacity-90">
                    Hızlı WhatsApp Hattı
                  </div>
                  <div className="text-sm font-bold">Tek Tıkla Mesaj Gönderin</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div id="contact" className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-elevated">
            <div className="space-y-2 mb-6">
              <h3 className="text-2xl font-bold text-zinc-950 font-display">
                Seans / Hizmet Rezervasyon Talebi
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500">
                Projeniz için tercih ettiğiniz stüdyoyu, hizmeti ve tarihi iletin, en geç 2 saat içinde dönüş yapalım.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-950">Rezervasyon Talebiniz Alındı</h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Teşekkür ederiz! Talebiniz stüdyo yöneticimize iletildi. Müsaitlik kontrol edilerek telefon veya WhatsApp ile sizinle irtibata geçilecektir.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-900 transition-colors"
                >
                  Yeni Bir Talep Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Örn: Can Ozan"
                      className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
                      Telefon / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0532 000 00 00"
                      className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
                      E-Posta Adresi *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ad@ornek.com"
                      className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
                      Tercih Edilen Tarih
                    </label>
                    <input
                      type="date"
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
                      İlgilendiğiniz Stüdyo
                    </label>
                    <select
                      value={formData.studio_room_interested}
                      onChange={(e) => setFormData({ ...formData, studio_room_interested: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-900"
                    >
                      <option value="">Oda Seçiniz (Opsiyonel)</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.name}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
                      Hizmet Türü
                    </label>
                    <select
                      value={formData.service_interested}
                      onChange={(e) => setFormData({ ...formData, service_interested: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-900"
                    >
                      <option value="">Hizmet Seçiniz (Opsiyonel)</option>
                      {services.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
                    Proje Detayları / Notunuz *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Kaç kişi katılacaksınız, kaç saatlik seans düşünüyorsunuz veya özel bir ekipman talebiniz var mı?"
                    className="w-full px-4 py-2.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-all shadow-card flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Rezervasyon Talebini İlet</span>
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
