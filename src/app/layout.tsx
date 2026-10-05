import type { Metadata, Viewport } from 'next';
import './globals.css';
import { JsonLd } from '@/components/seo/JsonLd';
import { initialSiteSettings } from '@/lib/data/mock-data';

export const viewport: Viewport = {
  themeColor: '#090A0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://murlocstudio.com'),
  title: {
    default: 'Murloc Studio | Profesyonel Müzik ve Kayıt Stüdyosu',
    template: '%s | Murloc Studio',
  },
  description:
    'Murloc Studio (murlocstudio) - İstanbul Beşiktaş merkezli profesyonel ses kayıt stüdyosu. SSL 4000E konsol, 7.1.4 Dolby Atmos miksaj, Neve ve Tube-Tech analog zincir, mastering ve 4K podcast prodüksiyonu.',
  keywords: [
    'murlocstudio',
    'Murloc Studio',
    'müzik stüdyosu',
    'ses kayıt stüdyosu istanbul',
    'beşiktaş ses kayıt stüdyosu',
    'analog miksaj',
    'dolby atmos mastering',
    'vokal kaydı',
    'podcast stüdyosu kiralama',
    'ekipman kiralama ses',
    'ssl 4000e',
    'neve 1073',
  ],
  authors: [{ name: 'Murloc Studio', url: 'https://murlocstudio.com' }],
  creator: 'Murloc Studio',
  publisher: 'Murloc Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://murlocstudio.com',
    siteName: 'Murloc Studio',
    title: 'Murloc Studio | Profesyonel Müzik ve Kayıt Stüdyosu',
    description:
      'Akustiğin ve sanatın buluştuğu nokta. İstanbul Beşiktaş’ta 3 özel tasarım stüdyo, SSL analog konsol ve Dolby Atmos mastering altyapısı.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: 'Murloc Studio Main Console & Live Room',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murloc Studio | Profesyonel Müzik ve Kayıt Stüdyosu',
    description:
      'İstanbul Beşiktaş’ta 3 bağımsız stüdyo, SSL analog konsol, Neve preamplifikatörler ve 7.1.4 Dolby Atmos prodüksiyonu.',
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <JsonLd settings={initialSiteSettings} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-zinc-950 selection:text-white">
        {children}
      </body>
    </html>
  );
}
