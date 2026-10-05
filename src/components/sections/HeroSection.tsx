'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Sparkles, Sliders, Disc, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '@/types/database';

interface HeroSectionProps {
  settings: SiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      {/* Subtle editorial grid pattern */}
      <div className="absolute inset-0 editorial-grid-bg opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Live Studio Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-subtle text-xs font-mono">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="font-semibold text-zinc-900 tracking-wide">MURLOC STUDIO</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500">BEŞİKTAŞ / İSTANBUL</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] font-display">
                {settings.hero_headline || 'Sesinizin En Saf ve Güçlü Hali'}
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl">
                {settings.hero_subheadline ||
                  'Dünya standartlarında analog ekipman parkuru, üstün akustik mimari ve deneyimli prodüksiyon ekibiyle müziğinize hayat verin.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-zinc-950 text-white font-semibold text-sm hover:bg-zinc-800 transition-all shadow-card hover:shadow-elevated active:scale-98 group"
              >
                <span>Rezervasyon / İletişim</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="#studios"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-zinc-900 font-semibold text-sm border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-subtle active:scale-98"
              >
                <span>Stüdyoları Keşfet</span>
                <ArrowDown className="w-4 h-4 text-zinc-500" />
              </Link>
            </div>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200/70">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-950 font-bold text-base">
                  <Disc className="w-4 h-4 text-red-600" />
                  <span>3 Özel Stüdyo</span>
                </div>
                <p className="text-xs text-zinc-500">Live Room, Vocal Suite, Mastering</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-950 font-bold text-base">
                  <Sliders className="w-4 h-4 text-zinc-800" />
                  <span>SSL & Neve</span>
                </div>
                <p className="text-xs text-zinc-500">Analog Outboard & Konsol</p>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-zinc-950 font-bold text-base">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>RT60 &lt; 0.28s</span>
                </div>
                <p className="text-xs text-zinc-500">Mükemmel Akustik İzolasyon</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 bg-white p-3 shadow-elevated">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900">
                <Image
                  src={settings.hero_image_url}
                  alt="Murloc Studio Main Console and Live Recording Room"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Visual Overlay Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-red-400 font-semibold">
                        STUDIO A • LIVE ROOM
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-white font-display">
                        SSL 4000E & Yamaha C7
                      </h3>
                    </div>
                    <div className="flex items-end gap-1 h-6">
                      <span className="w-1 bg-red-500 rounded-full audio-bar" style={{ animationDelay: '0.1s', height: '100%' }}></span>
                      <span className="w-1 bg-red-500 rounded-full audio-bar" style={{ animationDelay: '0.3s', height: '70%' }}></span>
                      <span className="w-1 bg-red-500 rounded-full audio-bar" style={{ animationDelay: '0.2s', height: '90%' }}></span>
                      <span className="w-1 bg-red-500 rounded-full audio-bar" style={{ animationDelay: '0.4s', height: '50%' }}></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Floating Tag */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-4 shadow-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                    Dolby Atmos 7.1.4
                  </div>
                  <div className="text-sm font-bold text-zinc-950">
                    Sertifikalı Mix Altyapısı
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
