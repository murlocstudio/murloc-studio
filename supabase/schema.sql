-- ==============================================================================
-- MURLOC STUDIO (murlocstudio) - PRODUCTION DATABASE SCHEMA & INITIAL SEED
-- Compatible with Supabase PostgreSQL, Row Level Security (RLS) & Storage
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop existing tables if re-running migration
DROP TABLE IF EXISTS contact_inquiries CASCADE;
DROP TABLE IF EXISTS portfolio_artists CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS equipment CASCADE;
DROP TABLE IF EXISTS studio_rooms CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- ------------------------------------------------------------------------------
-- Table 1: site_settings
-- Stores global studio parameters, hero copy, story, contact details, and SEO
-- ------------------------------------------------------------------------------
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_title VARCHAR(255) NOT NULL DEFAULT 'Murloc Studio | Profesyonel Müzik ve Kayıt Stüdyosu',
    site_tagline VARCHAR(255) DEFAULT 'Akustiğin ve Sanatın Buluştuğu Nokta',
    hero_headline VARCHAR(255) DEFAULT 'Sesinizin En Saf ve Güçlü Hali',
    hero_subheadline TEXT DEFAULT 'İstanbul''un kalbinde, dünya standartlarında analog ekipman parkuru, üstün akustik mimari ve deneyimli prodüksiyon ekibiyle müziğinize hayat verin.',
    hero_image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85',
    story_title VARCHAR(255) DEFAULT 'Kusursuz Ses Tutkusuyla Doğdu',
    story_narrative TEXT DEFAULT 'Murloc Studio, müzisyenlerin ve yapımcıların yaratıcı vizyonlarını en yüksek ses kalitesiyle gerçekleştirebilmeleri için 2018 yılında kuruldu. 3 ayrı bağımsız stüdyomuz, her biri özel akustik modellemelerle (RT60 < 0.28s) inşa edilmiş olup, efsanevi SSL 4000E konsol, Neve 1073 preamplifikatörler ve geniş vintage mikrofon koleksiyonumuzla donatılmıştır.',
    story_image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85',
    phone VARCHAR(50) DEFAULT '+90 (212) 555 0199',
    whatsapp_number VARCHAR(50) DEFAULT '905300000000',
    email VARCHAR(255) DEFAULT 'info@murlocstudio.com',
    address TEXT DEFAULT 'Levazım Mah. Korukent Sitesi No: 42/B, Beşiktaş / İstanbul',
    google_maps_iframe TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.234123456789!2d29.0123456!3d41.0678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab63f8e5f2a1b%3A0x123456789abcdef!2zQmXFn2lrdGHFnywgxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Besiktas+Istanbul+Murloc+Studio',
    working_hours VARCHAR(100) DEFAULT 'Pazartesi - Pazar: 10:00 - 02:00 (7/24 Rezervasyonlu)',
    instagram_url VARCHAR(255) DEFAULT 'https://instagram.com/murlocstudio',
    spotify_url VARCHAR(255) DEFAULT 'https://open.spotify.com',
    youtube_url VARCHAR(255) DEFAULT 'https://youtube.com',
    seo_keywords TEXT DEFAULT 'murlocstudio, Murloc Studio, müzik stüdyosu, ses kayıt stüdyosu istanbul, mixing mastering, vokal kaydı, podcast stüdyosu, analog kayıt',
    is_booking_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- Table 2: studio_rooms
-- The 3 flagship recording rooms (Studio A, Studio B, Studio C)
-- ------------------------------------------------------------------------------
CREATE TABLE studio_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    short_tag VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    size_sqm INT DEFAULT 45,
    acoustic_specs JSONB DEFAULT '{}'::jsonb,
    features TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    primary_image TEXT NOT NULL,
    hourly_rate_info VARCHAR(100) DEFAULT 'Teklif İsteyiniz',
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- Table 3: equipment
-- Studio equipment inventory with category, room link, and rental eligibility
-- ------------------------------------------------------------------------------
CREATE TABLE equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    studio_room_id UUID REFERENCES studio_rooms(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Microphones', 'Monitoring', 'Outboard & Preamps', 'Instruments & Amplifiers', 'DAW & Converters'
    specs TEXT,
    is_rentable BOOLEAN DEFAULT FALSE,
    rental_daily_price VARCHAR(100),
    image_url TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- Table 4: services
-- Recording, Mixing, Mastering, Podcast, Rehearsal, Equipment Rental
-- ------------------------------------------------------------------------------
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Production', 'Post-Production', 'Broadcasting', 'Rental'
    short_description VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    deliverables TEXT[] DEFAULT '{}',
    is_rental BOOLEAN DEFAULT FALSE,
    price_info VARCHAR(100) DEFAULT 'Detaylı Bilgi İçin İletişime Geçin',
    badge_text VARCHAR(50),
    icon_name VARCHAR(50) DEFAULT 'Mic',
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- Table 5: portfolio_artists
-- Client catalog, albums, singles, artist name, streaming url, release year
-- ------------------------------------------------------------------------------
CREATE TABLE portfolio_artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artist_name VARCHAR(255) NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    role_description VARCHAR(150) DEFAULT 'Kayıt, Mix & Mastering',
    image_url TEXT NOT NULL,
    release_year INT NOT NULL DEFAULT 2024,
    stream_url TEXT,
    preview_audio_url TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- Table 6: contact_inquiries
-- Booking and general message inquiries from the one-page form
-- ------------------------------------------------------------------------------
CREATE TABLE contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service_interested VARCHAR(100),
    studio_room_interested VARCHAR(100),
    preferred_date DATE,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'in_review', 'confirmed', 'archived'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Public: SELECT (Read-only) for site content
-- Public: INSERT for contact inquiries
-- Authenticated Users (Admin): ALL privileges (SELECT, INSERT, UPDATE, DELETE)
-- ==============================================================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 1. site_settings RLS
CREATE POLICY "Allow public read-only access on site_settings"
    ON site_settings FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated admins full access on site_settings"
    ON site_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 2. studio_rooms RLS
CREATE POLICY "Allow public read-only access on studio_rooms"
    ON studio_rooms FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated admins full access on studio_rooms"
    ON studio_rooms FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. equipment RLS
CREATE POLICY "Allow public read-only access on equipment"
    ON equipment FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated admins full access on equipment"
    ON equipment FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. services RLS
CREATE POLICY "Allow public read-only access on services"
    ON services FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated admins full access on services"
    ON services FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. portfolio_artists RLS
CREATE POLICY "Allow public read-only access on portfolio_artists"
    ON portfolio_artists FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated admins full access on portfolio_artists"
    ON portfolio_artists FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 6. contact_inquiries RLS
CREATE POLICY "Allow public to submit inquiries"
    ON contact_inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admins full access on inquiries"
    ON contact_inquiries FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKETS & POLICIES (Supabase Storage)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('studio-assets', 'studio-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Access for Studio Assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'studio-assets');

CREATE POLICY "Admin Upload Access for Studio Assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'studio-assets');

CREATE POLICY "Admin Update/Delete Access for Studio Assets"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'studio-assets');

-- ==============================================================================
-- INITIAL SEED DATA (Murloc Studio Flagship Setup)
-- ==============================================================================

-- 1. Insert Site Settings
INSERT INTO site_settings (
    site_title,
    site_tagline,
    hero_headline,
    hero_subheadline,
    hero_image_url,
    story_title,
    story_narrative,
    story_image_url,
    phone,
    whatsapp_number,
    email,
    address,
    working_hours,
    instagram_url,
    spotify_url,
    youtube_url,
    seo_keywords
) VALUES (
    'Murloc Studio | Profesyonel Müzik ve Kayıt Stüdyosu',
    'Akustiğin ve Sanatın Buluştuğu Nokta',
    'Sesinizin En Saf ve Güçlü Hali',
    'İstanbul''un kalbinde, dünya standartlarında analog ekipman parkuru, üstün akustik mimari ve deneyimli prodüksiyon ekibiyle müziğinize hayat verin.',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85',
    'Kusursuz Ses Tutkusuyla Doğdu',
    'Murloc Studio, müzisyenlerin ve prodüktörlerin yaratıcı vizyonlarını en yüksek ses kalitesiyle gerçekleştirebilmeleri amacıyla 2018 yılında kuruldu. 3 ayrı bağımsız stüdyomuz, her biri özel akustik modellemelerle (RT60 < 0.28s) inşa edilmiş olup, efsanevi SSL 4000E konsol, Neve 1073 preamplifikatörler ve geniş vintage mikrofon koleksiyonumuzla donatılmıştır.',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85',
    '+90 (212) 555 0199',
    '905300000000',
    'info@murlocstudio.com',
    'Levazım Mah. Korukent Sitesi No: 42/B, Beşiktaş / İstanbul',
    'Pazartesi - Pazar: 10:00 - 02:00 (7/24 Rezervasyonlu)',
    'https://instagram.com/murlocstudio',
    'https://open.spotify.com',
    'https://youtube.com',
    'murlocstudio, Murloc Studio, müzik stüdyosu, ses kayıt stüdyosu istanbul, mixing mastering, vokal kaydı, podcast stüdyosu, analog kayıt'
);

-- 2. Insert Studio Rooms (Studio A, Studio B, Studio C)
INSERT INTO studio_rooms (id, name, slug, short_tag, description, size_sqm, acoustic_specs, features, images, primary_image, hourly_rate_info, order_index)
VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'Studio A (Main Live Room & SSL Console)',
    'studio-a',
    'Amiral Gemisi Canlı Kayıt & Büyük Prodüksiyon',
    'Tam grup canlı hücum kayıtları, yaylı orkestraları ve büyük prodüksiyonlar için tasarlanmış ana stüdyomuz. 60 m² tavan yüksekliği optimize edilmiş canlı oda ve 32 kanal SSL 4000E analog konsol ile benzersiz bir sıcaklık.',
    85,
    '{"rt60": "0.32s", "isolation": "STC 68dB", "flooring": "Floating Oak Wood", "ceiling_height": "4.2m", "monitoring": "Genelec 1238A Main + NS-10M"}'::jsonb,
    ARRAY['32 Kanal SSL 4000E Konsol', 'Yamaha C7 Konser Piyanosu', 'Geniş Vokal & Davul Booth', 'Doğal Akustik Ahşap Paneller', 'Neve 1073 & 1176 Analog Rack'],
    ARRAY[
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80'
    ],
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
    '1.500 ₺ / Saat',
    1
),
(
    '22222222-2222-2222-2222-222222222222',
    'Studio B (Dolby Atmos & Vocal Suite)',
    'studio-b',
    'Vokal Tracking, Modern Beatmaking & Atmos Mix',
    'Vokal kayıtları, modern prodüksiyon, rap, pop ve elektronik müzik için optimize edilmiş stüdyo. 7.1.4 Dolby Atmos dinleme altyapısı ve dünyanın en iyi tüplü mikrofon zincirleri.',
    42,
    '{"rt60": "0.22s", "isolation": "STC 72dB", "flooring": "Acoustic Vinyl & Rug", "ceiling_height": "3.2m", "monitoring": "Genelec 8351B 7.1.4 Atmos System"}'::jsonb,
    ARRAY['7.1.4 Dolby Atmos Sertifikalı', 'Sony C-800G & Neumann U67', 'Tube-Tech CL1B Kompresör', 'Avid Pro Tools HDX', 'Ergonomik Prodüktör Masası'],
    ARRAY[
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80'
    ],
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80',
    '1.200 ₺ / Saat',
    2
),
(
    '33333333-3333-3333-3333-333333333333',
    'Studio C (Mixing, Mastering & Podcast)',
    'studio-c',
    'Stereo Mastering, Post-Prodüksiyon & 4K Podcast',
    'Ultra hassas mastering monitörleri, özel mastering ekolayzerları ve 4 kişiye kadar 4K çoklu kamera podcast/seslendirme yayınları için özel hazırlanmış stüdyo.',
    35,
    '{"rt60": "0.18s", "isolation": "STC 65dB", "flooring": "High Density Acoustic Mat", "ceiling_height": "3.0m", "monitoring": "Neumann KH 310 + KH 750 Sub"}'::jsonb,
    ARRAY['Analog Mastering Chain (Dangerous Music, Manley)', '4x Shure SM7B Podcast Setup', '4K Blackmagic Studio Kameralar', 'Akustik Difüzör Duvarı', 'Ultra Sessiz İklimlendirme'],
    ARRAY[
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80'
    ],
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
    '1.000 ₺ / Saat',
    3
);

-- 3. Insert Equipment
INSERT INTO equipment (studio_room_id, name, brand, category, specs, is_rentable, rental_daily_price, image_url, order_index)
VALUES
-- Microphones
('11111111-1111-1111-1111-111111111111', 'Neumann U 87 Ai (Stereo Pair)', 'Neumann', 'Microphones', 'Large-diaphragm multi-pattern condenser microphone, gold-sputtered capsule', true, '1.500 ₺ / Gün', 'https://images.unsplash.com/photo-1583244532610-2a234e7c3eca?auto=format&fit=crop&w=600&q=80', 1),
('22222222-2222-2222-2222-222222222222', 'Sony C-800G Tube Condenser', 'Sony', 'Microphones', 'Legendary Peltier-cooled vocal tube microphone', false, NULL, 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80', 2),
('11111111-1111-1111-1111-111111111111', 'Telefunken ELA M 251E', 'Telefunken', 'Microphones', 'Vintage reissue tube condenser, GE 6072A tube, CK12 capsule', true, '3.000 ₺ / Gün', 'https://images.unsplash.com/photo-1520523839898-5071282543e1?auto=format&fit=crop&w=600&q=80', 3),
('33333333-3333-3333-3333-333333333333', 'Shure SM7B (x4 Set)', 'Shure', 'Microphones', 'Dynamic cardioid broadcast microphone with Cloudlifter CL-1', true, '500 ₺ / Gün', 'https://images.unsplash.com/photo-1583244532610-2a234e7c3eca?auto=format&fit=crop&w=600&q=80', 4),
('11111111-1111-1111-1111-111111111111', 'Royer R-121 (Pair)', 'Royer', 'Microphones', 'Figure-8 dynamic ribbon microphone for guitars, brass and overheads', true, '1.000 ₺ / Gün', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', 5),

-- Outboard & Preamps
('11111111-1111-1111-1111-111111111111', 'Neve 1073 Dual Preamp / EQ', 'AMS Neve', 'Outboard & Preamps', 'Classic British discrete class-A preamp with 3-band EQ and high-pass filter', true, '2.000 ₺ / Gün', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80', 6),
('22222222-2222-2222-2222-222222222222', 'Tube-Tech CL 1B Optical Compressor', 'Tube-Tech', 'Outboard & Preamps', 'All-tube all-analogue optical mono compressor for silken vocals and bass', true, '2.500 ₺ / Gün', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80', 7),
('11111111-1111-1111-1111-111111111111', 'Universal Audio 1176LN (Stereo Pair)', 'Universal Audio', 'Outboard & Preamps', 'Classic FET limiting amplifier, ultrafast attack, all-buttons-in mode', true, '1.800 ₺ / Gün', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', 8),
('33333333-3333-3333-3333-333333333333', 'Manley Massive Passive Mastering EQ', 'Manley', 'Outboard & Preamps', 'Two-channel, 4-band passive tube equalizer with premium inductors', false, NULL, 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80', 9),

-- Monitoring
('11111111-1111-1111-1111-111111111111', 'Genelec 1238A SAM Smart Studio Monitors', 'Genelec', 'Monitoring', 'Tri-amplified DSP main monitors with GLM calibration', false, NULL, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80', 10),
('22222222-2222-2222-2222-222222222222', 'Genelec 8351B SAM Coaxial Active Monitors', 'Genelec', 'Monitoring', '3-way acoustically coaxial monitors, point-source precision', false, NULL, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80', 11),
('11111111-1111-1111-1111-111111111111', 'Yamaha NS-10M Studio + Bryston 4B', 'Yamaha', 'Monitoring', 'Industry-standard passive nearfield reference monitors', false, NULL, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80', 12),

-- Instruments & Backline
('11111111-1111-1111-1111-111111111111', 'Yamaha C7 Concert Grand Piano', 'Yamaha', 'Instruments & Amplifiers', '7-foot 6-inch acoustic grand piano, regularly tuned and voiced for recording', false, NULL, 'https://images.unsplash.com/photo-1520523839898-5071282543e1?auto=format&fit=crop&w=600&q=80', 13),
('11111111-1111-1111-1111-111111111111', 'DW Collector''s Series Maple Drum Kit', 'DW Drums', 'Instruments & Amplifiers', 'Handcrafted North American maple shells (22", 10", 12", 14", 16") + Zildjian K Cymbals', true, '2.000 ₺ / Gün', 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80', 14),
('11111111-1111-1111-1111-111111111111', 'Fender Custom Shop ''65 Twin Reverb', 'Fender', 'Instruments & Amplifiers', 'All-tube guitar combo amplifier, Jensen speakers, lush spring reverb', true, '1.200 ₺ / Gün', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', 15),
('22222222-2222-2222-2222-222222222222', 'Moog Subsequent 37 Analog Synthesizer', 'Moog', 'Instruments & Amplifiers', 'Paraphonic analog synthesizer with multidrive and sub-oscillator', true, '1.000 ₺ / Gün', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', 16);

-- 4. Insert Services
INSERT INTO services (title, category, short_description, description, deliverables, is_rental, price_info, badge_text, icon_name, order_index)
VALUES
(
    'Müzik ve Vokal Kaydı',
    'Production',
    'Akustik enstrüman, tam grup canlı hücum ve profesyonel vokal kayıtları.',
    'Studio A ve Studio B''de, dünyanın en iyi mikrofonları (Neumann, Sony C-800G, Telefunken) ve Neve/SSL preamplifikatörleriyle kristal netliğinde kayıt deneyimi. Deneyimli ses mühendislerimiz performansınızın en dinamik anlarını yakalar.',
    ARRAY['24-Bit / 96kHz Ham Stem Dosyaları', 'Vokal Komplama & Zamanlama Düzenlemeleri', 'Ön Dinleme Mixleri', 'Yedekleme Arşivi'],
    false,
    '1.200 ₺''den başlayan saatlik fiyatlar',
    'Popüler',
    'Mic',
    1
),
(
    'Mixing & Dolby Atmos Prodüksiyon',
    'Post-Production',
    'Analog ve dijital hibrit miksaj ile parçalarınıza derinlik, denge ve güç kazandırın.',
    'SSL 4000E konsolumuz, vintage outboard kompresörlerimiz ve sektör standardı dijital eklentilerimizle hazırlanan miksajlar. Ayrıca 7.1.4 surround altyapımızla Apple Music & Tidal için Dolby Atmos miks hazırlığı.',
    ARRAY['Stereo Master WAV (24-bit/48kHz & 96kHz)', 'Enstrümental & TV Track Versiyonları', 'Tüm Bireysel Stemler (Acapella, Drums, Bass vb.)', 'Dolby Atmos ADM BWF Dosyası (Opsiyonel)'],
    false,
    'Şarkı Başına Fiyatlandırılır',
    'En Çok Tercih Edilen',
    'Sliders',
    2
),
(
    'Analog & Dijital Audio Mastering',
    'Post-Production',
    'Spotify, Apple Music, Plak ve Radyo için uluslararası standartlarda son dokunuş.',
    'Manley Massive Passive, Dangerous Music Master ve Prism Sound çeviriciler ile parçanızın frekans dengesi, stereo genişliği ve dinamik alanı optimize edilir. Ticari platformlarda maksimum berraklık ve ses yüksekliği garantisi.',
    ARRAY['Streaming Optimize Edilmiş DDP / WAV Master', 'Hi-Res 24-bit Master', 'Plak (Vinyl) Kesim İçin Özel Master Dosyası', 'ISRC ve Meta Veri Kodlaması'],
    false,
    'Tek Şarkı: 1.500 ₺ / Albüm İndirimi',
    'Analog Zincir',
    'Disc',
    3
),
(
    'Podcast & Seslendirme Prodüksiyonu',
    'Broadcasting',
    '4 kişiye kadar 4K çoklu kameralı podcast çekimi ve profesyonel seslendirme kaydı.',
    'Studio C''nin sessiz ortamında Shure SM7B mikrofonlar ve Blackmagic 4K kameralar ile podcast, sesli kitap, reklam seslendirmesi ve kurumsal dublaj projeleriniz tek elden üretilir.',
    ARRAY['Çok Kanallı Temizlenmiş Ses Dosyaları', 'Senkronize 4K Çoklu Kamera Video Kurgusu', 'Gürültü ve Yankı Giderme İşlemleri', 'Intro/Outro Müzik Miksajı'],
    false,
    '1.000 ₺ / Saat (Kamera Dahil Paketler Mevcuttur)',
    'Video & Ses',
    'Radio',
    4
),
(
    'Grup Prova & Ön Prodüksiyon',
    'Production',
    'Canlı konserler, turne hazırlıkları ve albüm provaları için yüksek ses izolasyonlu alan.',
    'Tam donanımlı davul seti, bas/gitar amfileri, PA sistemi ve profesyonel kulaklık/monitör dinleme sistemi ile kesintisiz prova imkanı. İsteğe bağlı çok kanallı prova kaydı.',
    ARRAY['Full Backline Ekipman Kullanımı', 'PA & 4x Monitör Sistemi', 'Mikrofon Seti', 'Opsiyonel Stereo Prova Kaydı'],
    false,
    '600 ₺ / Saat (Min. 2 Saat)',
    '7/24 Açık',
    'Music',
    5
),
(
    'Profesyonel Ekipman Kiralama',
    'Rental',
    'Dış mekan çekimleri, canlı konserler ve bağımsız projeler için premium ses ekipmanları.',
    'Neumann ve Telefunken mikrofonlar, Neve ve Tube-Tech dış donanımlar, taşınabilir ses kayıt kartları ve backline ekipmanlarımız günlük veya haftalık olarak kiralanabilir.',
    ARRAY['Özel Taşıma Hardcase Çantaları', 'Tüm Gerekli Kablo ve Aksesuarlar', 'Teknik Destek & Kurulum Rehberi', 'Sigortalı Teslimat Seçeneği'],
    true,
    'Günlük 500 ₺''den başlayan seçenekler',
    'Kiralama',
    'Package',
    6
);

-- 5. Insert Portfolio Artists
INSERT INTO portfolio_artists (artist_name, project_title, genre, role_description, image_url, release_year, stream_url, preview_audio_url, order_index)
VALUES
(
    'Can Ozan & Deniz Tekin',
    'Gecenin Sessizliği (Akustik EP)',
    'Indie Pop / Akustik',
    'Studio A Canlı Hücum Kaydı & Analog Mix',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    2024,
    'https://open.spotify.com',
    'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    1
),
(
    'Madrigal',
    'Sonsuz Dans (Single)',
    'Alternatif Rock / Synth Pop',
    'Vokal Tracking, Dolby Atmos Mixing & Mastering',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    2024,
    'https://open.spotify.com',
    'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    2
),
(
    'Evdeki Saat',
    'Zamanın Ötesinde (Albüm)',
    'Electro Pop / Indie',
    'Davul & Vokal Kaydı, Analog SSL Mix',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    2023,
    'https://open.spotify.com',
    'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    3
),
(
    'Nova Norda',
    'Kozmik Ritim (EP)',
    'Electronic / Nu-Disco',
    'Prodüksiyon Danışmanlığı, Vokal Suite & Mastering',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    2024,
    'https://open.spotify.com',
    'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    4
),
(
    'Büyük Ev Ablukada',
    'Canlı Konser Hazırlığı & Stem Kayıtları',
    'Alternative / Electronic Rock',
    'Studio A Hücum Kayıt & Prova Prodüksiyonu',
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    2023,
    'https://open.spotify.com',
    'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    5
),
(
    'Jakuzi',
    'Aynalar (Mastering Edition)',
    'Darkwave / Synthwave',
    'Analog Tape Transfer & Vinyl Mastering',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    2024,
    'https://open.spotify.com',
    'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    6
);
