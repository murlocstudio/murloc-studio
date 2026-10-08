'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Music, Mic, Sliders, Radio, Clock, Check } from 'lucide-react';
import { StudioService } from '@/types/database';

interface RatesSectionProps {
  services: StudioService[];
}

export const RatesSection: React.FC<RatesSectionProps> = ({ services }) => {
  return (
    <section id="rates" className="py-24 bg-[#090A0B] text-[#FAF8F5] border-t border-white/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Instagram Styled Color Title */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#4A8B9E] font-bold">
            ŞEFFAF TARİFELER & REZERVASYON
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight leading-none">
            <span className="text-[#E26D4B]">SAATLİK </span>
            <span className="text-[#4A8B9E]">ODA </span>
            <span className="text-[#FAF8F5]">ÜCRETLERİ</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#FAF8F5]/70 pt-1">
            Grup prova seansları, canlı hücum kayıt, vokal tracking ve bireysel pratik odaları.
          </p>
        </div>

        {/* Rates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Prova */}
          <div className="bg-[#16171A] rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#E26D4B]/50 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#E26D4B]/20 text-[#E26D4B] font-bold">
                  PROVA
                </span>
                <Music className="w-5 h-5 text-[#E26D4B]" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase font-display text-[#FAF8F5]">
                  Grup Prova Seansı
                </h3>
                <p className="text-xs font-mono text-[#FAF8F5]/60 mt-1">
                  Full backline amfiler, davul seti ve PA sistemi dahil.
                </p>
              </div>
              <ul className="space-y-1.5 pt-2 text-xs font-mono text-[#FAF8F5]/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E26D4B]" />
                  <span>Marshall, Fender & Ampeg</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E26D4B]" />
                  <span>Tama Starclassic Davul Seti</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E26D4B]" />
                  <span>4x Vokal Mikrofonu & Monitör</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FAF8F5]/50 block">Saatlik</span>
                <span className="text-lg font-black font-mono text-[#FAF8F5]">500 ₺</span>
              </div>
              <Link
                href="#contact?service=Grup+Prova"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E26D4B] text-white text-xs font-mono font-bold uppercase hover:bg-[#c95b3b] transition-colors"
              >
                <span>Ayırt</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Hücum & Kanal Kayıt */}
          <div className="bg-[#16171A] rounded-3xl p-6 border-2 border-[#E26D4B] flex flex-col justify-between relative shadow-glow">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#E26D4B] text-white font-mono font-bold text-[10px] uppercase">
              POPÜLER
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#E26D4B]/20 text-[#E26D4B] font-bold">
                  KAYIT
                </span>
                <Mic className="w-5 h-5 text-[#E26D4B]" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase font-display text-[#FAF8F5]">
                  Canlı Hücum / Vokal Kayıt
                </h3>
                <p className="text-xs font-mono text-[#FAF8F5]/60 mt-1">
                  Kıdemli ses mühendisi ve çok kanallı analog kayıt.
                </p>
              </div>
              <ul className="space-y-1.5 pt-2 text-xs font-mono text-[#FAF8F5]/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E26D4B]" />
                  <span>Neumann U87 & Neve Preamp</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E26D4B]" />
                  <span>Eşzamanlı 16 Kanal Hücum Kayıt</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E26D4B]" />
                  <span>Ham WAV Stem Dosya Teslimi</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FAF8F5]/50 block">Saatlik</span>
                <span className="text-lg font-black font-mono text-[#FAF8F5]">1.000 ₺</span>
              </div>
              <Link
                href="#contact?service=Canlı+Hücum+Kayıt"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E26D4B] text-white text-xs font-mono font-bold uppercase hover:bg-[#c95b3b] transition-colors"
              >
                <span>Ayırt</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Bireysel Ders & Pratik */}
          <div className="bg-[#16171A] rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#4A8B9E]/50 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#4A8B9E]/20 text-[#4A8B9E] font-bold">
                  BİREYSEL
                </span>
                <Radio className="w-5 h-5 text-[#4A8B9E]" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase font-display text-[#FAF8F5]">
                  Derslik & Bireysel Çalışma
                </h3>
                <p className="text-xs font-mono text-[#FAF8F5]/60 mt-1">
                  Tekil bateri, gitar, vokal pratiği veya özel dersler.
                </p>
              </div>
              <ul className="space-y-1.5 pt-2 text-xs font-mono text-[#FAF8F5]/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4A8B9E]" />
                  <span>Akustik Davul veya Amfi Kullanımı</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4A8B9E]" />
                  <span>Yüksek Ses İzolasyonlu Kabin</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4A8B9E]" />
                  <span>Haftalık Paket İndirimleri</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FAF8F5]/50 block">Saatlik</span>
                <span className="text-lg font-black font-mono text-[#FAF8F5]">350 ₺</span>
              </div>
              <Link
                href="#contact?service=Bireysel+Calisma"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4A8B9E] text-white text-xs font-mono font-bold uppercase hover:bg-[#3b7585] transition-colors"
              >
                <span>Ayırt</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Mix & Mastering */}
          <div className="bg-[#16171A] rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-white/40 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white font-bold">
                  POST-PRODÜKSİYON
                </span>
                <Sliders className="w-5 h-5 text-[#FAF8F5]" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase font-display text-[#FAF8F5]">
                  Mixing & Mastering
                </h3>
                <p className="text-xs font-mono text-[#FAF8F5]/60 mt-1">
                  Analog hibrit miksaj ve dijital platform mastering.
                </p>
              </div>
              <ul className="space-y-1.5 pt-2 text-xs font-mono text-[#FAF8F5]/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FAF8F5]" />
                  <span>Analog Dış Donanım İşleme</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FAF8F5]" />
                  <span>Streaming Optimize Master WAV</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FAF8F5]" />
                  <span>Revizyon ve İnce Ayar Dahil</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FAF8F5]/50 block">Proje Başı</span>
                <span className="text-xs font-bold font-mono text-[#FAF8F5]">Teklif İsteyiniz</span>
              </div>
              <Link
                href="#contact?service=Mix+Mastering"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase transition-colors"
              >
                <span>Teklif Al</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
