import React from 'react';
import { SiteSettings } from '@/types/database';

interface JsonLdProps {
  settings: SiteSettings;
}

export const JsonLd: React.FC<JsonLdProps> = ({ settings }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://murlocstudio.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MusicVenue', 'ProfessionalService'],
    '@id': `${siteUrl}/#business`,
    name: 'Murloc Studio',
    alternateName: 'murlocstudio',
    description: settings.hero_subheadline || 'İstanbul Beşiktaş merkezli profesyonel ses kayıt, analog mixing, mastering, prova ve podcast stüdyosu.',
    url: siteUrl,
    telephone: settings.phone || '+90 212 555 0199',
    email: settings.email || 'info@murlocstudio.com',
    priceRange: '₺₺ - ₺₺₺',
    image: settings.hero_image_url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Levazım Mah. Korukent Sitesi No: 42/B',
      addressLocality: 'Beşiktaş',
      addressRegion: 'İstanbul',
      postalCode: '34340',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.06789,
      longitude: 29.01234,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '02:00',
      },
    ],
    sameAs: [
      settings.instagram_url,
      settings.spotify_url,
      settings.youtube_url,
    ].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Murloc Studio Hizmetleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Müzik ve Vokal Kaydı',
            description: 'SSL 4000E ve Neve analog preamplifikatörler ile profesyonel vokal ve canlı hücum stüdyo kaydı.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mixing & Dolby Atmos Prodüksiyon',
            description: 'Analog & dijital miksaj ve 7.1.4 Dolby Atmos miks hazırlığı.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Analog Audio Mastering',
            description: 'Spotify, Apple Music ve Plak için Manley ve Dangerous Music analog mastering zinciri.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '4K Çok Kameralı Podcast Stüdyosu',
            description: 'Shure SM7B ve Blackmagic 4K kameralar ile video ve ses prodüksiyonu.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
