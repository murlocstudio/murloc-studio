'use client';

import React, { useState } from 'react';
import { StudioRoom, StudioService } from '@/types/database';
import { Calculator, Check, ArrowRight, Sparkles, Clock, Sliders, ShieldCheck } from 'lucide-react';

interface PriceCalculatorProps {
  rooms: StudioRoom[];
  services: StudioService[];
  onSelectPackage?: (summaryText: string) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ rooms, services, onSelectPackage }) => {
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string>('studio-a');
  const [hours, setHours] = useState<number>(4);
  const [needsEngineer, setNeedsEngineer] = useState<boolean>(true);
  const [needsMastering, setNeedsMastering] = useState<boolean>(false);
  const [needsVideo, setNeedsVideo] = useState<boolean>(false);

  // Hourly rate map
  const roomRates: Record<string, number> = {
    'studio-a': 1500,
    'studio-b': 1200,
    'studio-c': 1000,
  };

  const currentRoomRate = roomRates[selectedRoomSlug] || 1200;
  const studioTotal = currentRoomRate * hours;
  const engineerTotal = needsEngineer ? 300 * hours : 0;
  const masteringTotal = needsMastering ? 1500 : 0;
  const videoTotal = needsVideo ? 500 * hours : 0;

  // 10% discount for 8+ hours (Full Day)
  const isFullDayDiscount = hours >= 8;
  const subtotal = studioTotal + engineerTotal + masteringTotal + videoTotal;
  const discountAmount = isFullDayDiscount ? subtotal * 0.1 : 0;
  const grandTotal = subtotal - discountAmount;

  const handleBookEstimate = () => {
    const activeRoom = rooms.find((r) => r.slug === selectedRoomSlug)?.name || selectedRoomSlug;
    const summary = `Tahmini Paket: ${activeRoom} (${hours} Saat) + ${
      needsEngineer ? 'Ses Mühendisi Dahil, ' : ''
    }${needsMastering ? 'Mastering Dahil, ' : ''}${needsVideo ? '4K Video Çekimi Dahil' : ''} (Tahmini: ${grandTotal.toLocaleString('tr-TR')} ₺)`;

    if (onSelectPackage) {
      onSelectPackage(summary);
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-elevated relative overflow-hidden">
      {/* Visual background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Canlı Maliyet Hesaplayıcı
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Stüdyo Seansı & Paket Hesaplama
            </h3>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Anlık Müsaitlik Fiyatlandırması</span>
          </div>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Options */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Select Room */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                1. Stüdyo Odası Seçimi
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {rooms.map((room) => {
                  const isSelected = selectedRoomSlug === room.slug;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoomSlug(room.slug)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-zinc-900 border-red-500 text-white shadow-sm'
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <div className="font-bold text-xs truncate text-white">
                        {room.name.split('(')[0].trim()}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-1">
                        {room.hourly_rate_info}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Duration */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                  2. Seans Süresi: <span className="text-white font-bold">{hours} Saat</span>
                </label>
                {isFullDayDiscount && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-red-950 text-red-400 border border-red-800/80">
                    %10 Tam Gün İndirimi
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {[2, 4, 6, 8, 12].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHours(h)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                      hours === h
                        ? 'bg-white text-zinc-950'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {h} Saat
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Add-on Services */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                3. Ekstra Prodüksiyon Hizmetleri
              </label>

              <div className="space-y-2">
                <label
                  onClick={() => setNeedsEngineer(!needsEngineer)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    needsEngineer
                      ? 'bg-zinc-900 border-zinc-700 text-white'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        needsEngineer ? 'bg-red-600 border-red-600' : 'border-zinc-700'
                      }`}
                    >
                      {needsEngineer && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">Kıdemli Tonmayster / Ses Mühendisi Eşliği</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">+300 ₺ / saat</span>
                </label>

                <label
                  onClick={() => setNeedsMastering(!needsMastering)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    needsMastering
                      ? 'bg-zinc-900 border-zinc-700 text-white'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        needsMastering ? 'bg-red-600 border-red-600' : 'border-zinc-700'
                      }`}
                    >
                      {needsMastering && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">Analog Mastering Paketi (1 Parça)</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">+1.500 ₺</span>
                </label>

                <label
                  onClick={() => setNeedsVideo(!needsVideo)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    needsVideo
                      ? 'bg-zinc-900 border-zinc-700 text-white'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        needsVideo ? 'bg-red-600 border-red-600' : 'border-zinc-700'
                      }`}
                    >
                      {needsVideo && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">4K Çoklu Kamera Video Kaydı</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">+500 ₺ / saat</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Summary Card */}
          <div className="lg:col-span-5 bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold pb-2 border-b border-zinc-800">
                Fiyat Dağılımı Özeti
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Stüdyo Kullanımı ({hours}s x {currentRoomRate}₺):</span>
                  <span className="font-mono">{studioTotal.toLocaleString('tr-TR')} ₺</span>
                </div>

                {needsEngineer && (
                  <div className="flex justify-between text-zinc-300">
                    <span>Ses Mühendisi ({hours}s x 300₺):</span>
                    <span className="font-mono">{engineerTotal.toLocaleString('tr-TR')} ₺</span>
                  </div>
                )}

                {needsMastering && (
                  <div className="flex justify-between text-zinc-300">
                    <span>Analog Mastering:</span>
                    <span className="font-mono">{masteringTotal.toLocaleString('tr-TR')} ₺</span>
                  </div>
                )}

                {needsVideo && (
                  <div className="flex justify-between text-zinc-300">
                    <span>4K Kamera Seti:</span>
                    <span className="font-mono">{videoTotal.toLocaleString('tr-TR')} ₺</span>
                  </div>
                )}

                {isFullDayDiscount && (
                  <div className="flex justify-between text-red-400 pt-2 border-t border-zinc-800 font-semibold">
                    <span>Tam Gün Kampanya İndirimi (%10):</span>
                    <span className="font-mono">-{discountAmount.toLocaleString('tr-TR')} ₺</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono uppercase text-zinc-400">Tahmini Toplam:</span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {grandTotal.toLocaleString('tr-TR')} <span className="text-base text-zinc-400 font-normal">₺ + KDV</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBookEstimate}
                className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Bu Paketi Rezerve Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
                * Kesin seans takvimi ve özel proje indirimleri rezervasyon teyidi sırasında netleştirilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
