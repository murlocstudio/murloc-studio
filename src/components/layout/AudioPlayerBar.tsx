'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, X, Volume2, VolumeX, ExternalLink, Music } from 'lucide-react';
import { PortfolioArtist } from '@/types/database';

interface AudioPlayerBarProps {
  currentTrack: PortfolioArtist | null;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ currentTrack, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentTrack && currentTrack.preview_audio_url) {
      if (audioRef.current) {
        audioRef.current.src = currentTrack.preview_audio_url;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay policy fallback
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log('Audio play error:', e));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom duration-300">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 text-white p-3.5 rounded-2xl shadow-elevated flex items-center gap-3.5">
        {/* Album Artwork */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
          <Image
            src={currentTrack.image_url}
            alt={currentTrack.project_title}
            fill
            className="object-cover"
          />
        </div>

        {/* Track details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-red-500 font-bold">
              Ön Dinleme
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">• {currentTrack.genre}</span>
          </div>
          <div className="text-xs font-bold text-white truncate">
            {currentTrack.project_title}
          </div>
          <div className="text-[11px] text-zinc-400 truncate">
            {currentTrack.artist_name}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            aria-label={isPlaying ? 'Durdur' : 'Oynat'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-zinc-950" /> : <Play className="w-4 h-4 fill-zinc-950 ml-0.5" />}
          </button>

          {currentTrack.stream_url && (
            <a
              href={currentTrack.stream_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Spotify'da Dinle"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={toggleMute}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
            aria-label="Sesi Aç/Kapat"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-white transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
