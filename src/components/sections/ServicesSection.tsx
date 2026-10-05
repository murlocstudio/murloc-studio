'use client';

import React from 'react';
import Link from 'next/link';
import { StudioService } from '@/types/database';
import { Mic, Sliders, Disc, Radio, Music, Package, Check, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  services: StudioService[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Mic':
        return <Mic className="w-5 h-5" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5" />;
      case 'Disc':
        return <Disc className="w-5 h-5" />;
      case 'Radio':
        return <Radio className="w-5 h-5" />;
      case 'Music':
        return <Music className="w-5 h-5" />;
      case 'Package':
        return <Package className="w-5 h-5" />;
      default:
        return <Sliders className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-zinc-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              Kapsamlı Prodüksiyon Hizmetleri
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-display tracking-tight">
            Hizmetler & Prodüksiyon Çözümleri
          </h2>
          <p className="text-base sm:text-lg text-zinc-600">
            Fikirden nihai master kayda kadar müzik, reklam, podcast ve video projelerinizin tüm aşamalarını profesyonel standartlarda yönetiyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-zinc-50/70 hover:bg-white rounded-3xl p-8 border border-zinc-200/80 hover:border-zinc-300 transition-all duration-300 shadow-subtle hover:shadow-elevated flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    {getIcon(service.icon_name)}
                  </div>
                  {service.badge_text && (
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-800">
                      {service.badge_text}
                    </span>
                  )}
                </div>

                {/* Title & Short Description */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-950 font-display">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables List */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="space-y-2.5 pt-2 border-t border-zinc-200/60">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                      Teslim Edilenler:
                    </span>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Price & CTA */}
              <div className="pt-6 mt-6 border-t border-zinc-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Fiyatlandırma
                  </span>
                  <span className="text-xs font-bold text-zinc-900 font-mono">
                    {service.price_info}
                  </span>
                </div>
                <Link
                  href={`#contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-950 text-white hover:bg-zinc-800 transition-colors shadow-sm active:scale-95"
                >
                  <span>Teklif Al</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
