'use client';

import React, { useState } from 'react';
import { StudioDataBundle, PortfolioArtist } from '@/types/database';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StudiosSection } from '@/components/sections/StudiosSection';
import { EquipmentSection } from '@/components/sections/EquipmentSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PriceCalculator } from '@/components/sections/PriceCalculator';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { StorySection } from '@/components/sections/StorySection';
import { LocationContactSection } from '@/components/sections/LocationContactSection';
import { AudioPlayerBar } from '@/components/layout/AudioPlayerBar';
import { LightboxModal } from '@/components/ui/LightboxModal';

interface OnePageStudioClientProps {
  initialData: StudioDataBundle;
}

export const OnePageStudioClient: React.FC<OnePageStudioClientProps> = ({ initialData }) => {
  const [activeTrack, setActiveTrack] = useState<PortfolioArtist | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title?: string } | null>(null);
  const [prefilledBookingMsg, setPrefilledBookingMsg] = useState<string>('');

  const { settings, rooms, equipment, services, portfolio } = initialData;

  const handlePlayTrack = (track: PortfolioArtist) => {
    setActiveTrack(track);
  };

  const handleClosePlayer = () => {
    setActiveTrack(null);
  };

  const handlePackageSelected = (summaryText: string) => {
    setPrefilledBookingMsg(summaryText);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-zinc-900 selection:text-white">
      {/* Sticky Header */}
      <Navbar settings={settings} />

      {/* Main One-Page Content */}
      <main className="flex-1">
        <HeroSection settings={settings} />
        <StudiosSection rooms={rooms} equipment={equipment} />
        <EquipmentSection equipment={equipment} />
        
        {/* Services & Live Price Estimator */}
        <ServicesSection services={services} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PriceCalculator
            rooms={rooms}
            services={services}
            onSelectPackage={handlePackageSelected}
          />
        </div>

        <PortfolioSection
          portfolio={portfolio}
          onPlayTrack={handlePlayTrack}
          activeTrackId={activeTrack?.id}
        />
        <StorySection settings={settings} />
        <LocationContactSection
          settings={settings}
          rooms={rooms}
          services={services}
          prefilledMessage={prefilledBookingMsg}
        />
      </main>

      {/* Floating Audio Preview Player */}
      <AudioPlayerBar currentTrack={activeTrack} onClose={handleClosePlayer} />

      {/* Lightbox Modal */}
      <LightboxModal
        imageUrl={lightboxImage?.url || null}
        title={lightboxImage?.title}
        onClose={() => setLightboxImage(null)}
      />

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
};
