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
    name: 'Murloc Music Studio',
    alternateName: ['studiomurloc', 'Murloc Studio'],
    description: 'Ankara Çankaya Kavaklıdere Tunus Caddesi merkezli profesyonel ses kayıt, prova ve analog prodüksiyon stüdyosu.',
    url: siteUrl,
    telephone: settings.phone || '+90 530 000 00 00',
    email: settings.email || 'studiomurloc@gmail.com',
    priceRange: '₺₺',
    image: settings.hero_image_url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kavaklıdere Mah. Tunus Cad. No: 14/5',
      addressLocality: 'Çankaya',
      addressRegion: 'Ankara',
      postalCode: '06680',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.91234,
      longitude: 32.85501,
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
      'https://instagram.com/studiomurloc',
      settings.spotify_url,
      settings.youtube_url,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
