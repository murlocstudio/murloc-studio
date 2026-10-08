'use client';

import React, { useState } from 'react';
import { StudioDataBundle, PortfolioArtist } from '@/types/database';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StudiosSection } from '@/components/sections/StudiosSection';
import { RatesSection } from '@/components/sections/RatesSection';
import { EquipmentSection } from '@/components/sections/EquipmentSection';
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

  const handleClosePlayer = () => {
    setActiveTrack(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1012] text-[#FAF8F5] selection:bg-[#E26D4B] selection:text-white">
      {/* Sticky Header */}
      <Navbar settings={settings} />

      {/* Main One-Page Content */}
      <main className="flex-1">
        <HeroSection settings={settings} />
        <StudiosSection rooms={rooms} equipment={equipment} />
        <RatesSection services={services} />
        <EquipmentSection equipment={equipment} />
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
