import React from 'react';
import BlurText from '../animations/BlurText.js';
import RotatingText from '../animations/RotatingText.js';

const STATS = [
  { value: '50+', label: 'Klien Puas' },
  { value: '100+', label: 'Proyek Selesai' },
  { value: '24/7', label: 'Dukungan' },
];

const HeroSection = ({ scrollToSection }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16">
      <div className="absolute inset-0 animated-gradient opacity-20" aria-hidden="true" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" aria-hidden="true" />

      <div className="hero-content text-center relative z-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="badge badge-primary badge-outline px-4 py-3 mb-6 text-xs sm:text-sm">
            Solusi Digital Terpercaya
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
            <BlurText
              text="Wujudkan"
              delay={150}
              animateBy="words"
              direction="top"
              className="inline-block justify-center"
            />
          </h1>

          <p className="py-4 sm:py-6 text-base sm:text-lg md:text-xl leading-relaxed mb-8 text-base-content/80">
            <BlurText
              text="Solusi digital lengkap untuk semua kebutuhan kamu"
              delay={120}
              animateBy="words"
              direction="top"
              className="inline-block justify-center"
            />
          </p>

          <RotatingText
            texts={['Web & Aplikasi', 'VPS & Hosting', 'Bot WhatsApp', 'SEO & Sosial Media']}
            mainClassName="px-3 sm:px-4 bg-gradient-to-r from-primary to-secondary text-primary-content overflow-hidden py-1 sm:py-2 justify-center rounded-lg font-semibold text-lg sm:text-2xl"
            staggerFrom="last"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
            <button
              className="btn btn-primary btn-lg w-full sm:w-auto animated-glow"
              onClick={() => scrollToSection('#product-section')}
            >
              Mulai Sekarang
            </button>
            <button
              className="btn btn-outline btn-lg w-full sm:w-auto"
              onClick={() => scrollToSection('#service-section')}
            >
              Lihat Layanan
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary">{stat.value}</span>
                <span className="text-xs sm:text-sm text-base-content/60 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;