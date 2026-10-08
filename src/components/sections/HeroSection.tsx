'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Disc, MapPin } from 'lucide-react';
import { SiteSettings } from '@/types/database';

interface HeroSectionProps {
  settings: SiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-12 bg-[#0F1012] text-[#FAF8F5] overflow-hidden vintage-overlay">
      {/* Background Studio Visual with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={settings.hero_image_url}
          alt="Murloc Music Studio Ankara Control Room & Live Space"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1012] via-[#0F1012]/60 to-[#0F1012]/90" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-12">
        <div className="max-w-4xl space-y-6">
          {/* Location & Vintage Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono text-[#FAF8F5]">
            <span className="w-2 h-2 rounded-full bg-[#E26D4B] animate-pulse" />
            <span className="font-bold tracking-widest uppercase">TUNUS CAD. NO: 14/5 • ANKARA / ÇANKAYA</span>
          </div>

          {/* Sound City Style Massive Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-display leading-[0.9] text-[#FAF8F5]">
              Murloc <span className="text-[#E26D4B]">Music</span> <br className="hidden sm:inline" />
              <span className="text-[#4A8B9E]">Studio</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#FAF8F5]/80 font-mono font-medium max-w-2xl pt-2 leading-relaxed">
              {settings.hero_subheadline ||
                'Ankara Tunus Caddesi’nde canlı hücum kayıt, vokal prodüksiyonu, analog miksaj, grup provaları ve derslikler.'}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E26D4B] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#c95b3b] transition-all shadow-glow active:scale-98"
            >
              <span>ONLINE RANDEVU AL</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="#rates"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 text-[#FAF8F5] border border-white/20 font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all active:scale-98"
            >
              <span>SAATLİK ÜCRETLER</span>
              <ArrowDown className="w-4 h-4 text-[#4A8B9E]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Instagram-Style Authentic Studio Keywords Ticker */}
      <div className="relative z-10 border-y border-white/10 bg-[#090A0B]/80 backdrop-blur-sm py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-[11px] font-mono font-semibold tracking-wider text-[#FAF8F5]/50 overflow-x-auto whitespace-nowrap gap-6 scrollbar-none">
          <span>KAYIT</span>
          <span className="text-[#E26D4B]">•</span>
          <span>GÜRÜLTÜ</span>
          <span className="text-[#4A8B9E]">•</span>
          <span>MIX & MASTERING</span>
          <span className="text-[#E26D4B]">•</span>
          <span>PROVA</span>
          <span className="text-[#4A8B9E]">•</span>
          <span>HÜCUM KAYIT</span>
          <span className="text-[#E26D4B]">•</span>
          <span>DERSLİK</span>
          <span className="text-[#4A8B9E]">•</span>
          <span>VINTAGE LAMBALI AMFİLER</span>
          <span className="text-[#E26D4B]">•</span>
          <span>TUNUS CADDESİ</span>
        </div>
      </div>
    </section>
  );
};
