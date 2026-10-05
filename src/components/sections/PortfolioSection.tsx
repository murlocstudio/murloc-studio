'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PortfolioArtist } from '@/types/database';
import { Play, ExternalLink, Disc, Music, Sparkles } from 'lucide-react';

interface PortfolioSectionProps {
  portfolio: PortfolioArtist[];
  onPlayTrack: (track: PortfolioArtist) => void;
  activeTrackId?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolio,
  onPlayTrack,
  activeTrackId,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const genres = ['All', ...Array.from(new Set(portfolio.map((p) => p.genre.split('/')[0].trim())))];

  const filteredPortfolio = portfolio.filter((item) => {
    if (selectedGenre === 'All') return true;
    return item.genre.toLowerCase().includes(selectedGenre.toLowerCase());
  });

  return (
    <section id="catalog" className="py-24 bg-zinc-50 border-t border-zinc-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                Stüdyo Diskografisi
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-display tracking-tight">
              Katalog & Öne Çıkan Yapımlar
            </h2>
            <p className="text-base sm:text-lg text-zinc-600">
              Murloc Studio’da kaydedilen, mikslenen ve masterlanan albümler, tekliler ve özel projeler.
            </p>
          </div>

          {/* Genre Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {genres.map((g) => {
              const isActive = selectedGenre === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {g === 'All' ? 'Tüm Türler' : g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item) => {
            const isCurrentPlaying = activeTrackId === item.id;
            return (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Artwork with hover play button overlay */}
                  <div className="relative aspect-square bg-zinc-900 overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={`${item.artist_name} - ${item.project_title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Play / Streaming Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={() => onPlayTrack(item)}
                        className="w-14 h-14 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg"
                        title="Ön Dinle"
                      >
                        <Play className="w-6 h-6 fill-zinc-950 ml-1" />
                      </button>
                      {item.stream_url && (
                        <a
                          href={item.stream_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-zinc-900/90 backdrop-blur-md text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border border-white/20"
                          title="Spotify'da Aç"
                        >
                          <Music className="w-5 h-5 text-green-400" />
                        </a>
                      )}
                    </div>

                    {/* Release Year Badge */}
                    <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full border border-white/10">
                      {item.release_year}
                    </div>

                    {/* Genre Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-zinc-900 text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-zinc-200">
                      {item.genre}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
                        {item.artist_name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-950 font-display line-clamp-1">
                      {item.project_title}
                    </h3>
                    {item.role_description && (
                      <p className="text-xs text-zinc-500 pt-1">
                        <span className="font-semibold text-zinc-700">Stüdyo Rolü: </span>
                        {item.role_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <button
                      onClick={() => onPlayTrack(item)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-red-600 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCurrentPlaying ? 'Şu Anda Çalıyor' : 'Ön Dinleme Başlat'}</span>
                    </button>

                    {item.stream_url && (
                      <a
                        href={item.stream_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-950 font-mono transition-colors"
                      >
                        <span>Spotify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
