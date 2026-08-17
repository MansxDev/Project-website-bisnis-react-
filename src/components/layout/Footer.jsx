import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
  FaServer,
  FaRobot,
  FaGlobe,
  FaMagnifyingGlass,
  FaPalette,
  FaArrowUp,
  FaLocationDot,
  FaLock,
} from 'react-icons/fa6';
import { useStore, KEYS } from '../../data/store.js';

const LOGO = `${process.env.PUBLIC_URL}/logo-mansx.svg`;

const NAV_LINKS = [
  { label: 'Beranda', href: '#top' },
  { label: 'Produk', href: '#product-section' },
  { label: 'Layanan', href: '#service-section' },
  { label: 'Kontak', href: '#contact' },
];

const SERVICE_LINKS = [
  { label: 'VPS & Hosting', href: '#product-section', icon: FaServer },
  { label: 'Bot WhatsApp', href: '#product-section', icon: FaRobot },
  { label: 'Pembuatan Website', href: '#service-section', icon: FaGlobe },
  { label: 'Optimasi SEO', href: '#service-section', icon: FaMagnifyingGlass },
  { label: 'Desain Grafis', href: '#service-section', icon: FaPalette },
];

const Footer = () => {
  const settings = useStore(KEYS.settings);
  const year = new Date().getFullYear();

  const socials = [
    { label: 'Instagram', href: settings.instagram || '#', icon: FaInstagram },
    { label: 'Facebook', href: settings.facebook || '#', icon: FaFacebookF },
    { label: 'GitHub', href: settings.github || '#', icon: FaGithub },
    { label: 'WhatsApp', href: `https://wa.me/${settings.phone}`, icon: FaWhatsapp },
  ];

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO} alt={settings.businessName} className="w-11 h-11 rounded-full shadow-lg" />
              <span className="text-2xl font-bold">
                {settings.businessName?.replace('.Dev', '')}
                <span className="text-primary">.Dev</span>
              </span>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">{settings.tagline}</p>
            <div className="flex items-center gap-2 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="btn btn-circle btn-ghost bg-base-100 hover:bg-primary hover:text-primary-content transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Navigasi</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-base-content/70 hover:text-primary hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Layanan</h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="flex items-center gap-2.5 text-sm text-base-content/70 hover:text-primary transition-colors"
                  >
                    <service.icon className="w-4 h-4 text-primary/70" />
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="btn btn-circle btn-ghost btn-sm bg-base-100 pointer-events-none">
                  <FaEnvelope className="w-3.5 h-3.5 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm text-base-content/70 hover:text-primary transition-colors break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="btn btn-circle btn-ghost btn-sm bg-base-100 pointer-events-none">
                  <FaWhatsapp className="w-3.5 h-3.5 text-green-500" />
                </span>
                <div>
                  <p className="text-sm font-semibold">WhatsApp</p>
                  <a
                    href={`https://wa.me/${settings.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-base-content/70 hover:text-primary transition-colors"
                  >
                    +{settings.phone?.slice(0, 2)} {settings.phone?.slice(2, 5)}-
                    {settings.phone?.slice(5, 9)}-{settings.phone?.slice(9, 13)}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="btn btn-circle btn-ghost btn-sm bg-base-100 pointer-events-none">
                  <FaLocationDot className="w-3.5 h-3.5 text-secondary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Lokasi</p>
                  <p className="text-sm text-base-content/70">Indonesia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider my-8"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-base-content/60">
            © {year} {settings.businessName}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#admin"
              className="text-xs text-base-content/40 hover:text-base-content/70 flex items-center gap-1.5"
            >
              <FaLock className="w-3 h-3" />
              Admin
            </a>
            <a
              href="#top"
              className="btn btn-ghost btn-sm gap-2 hover:bg-primary/10"
              aria-label="Kembali ke atas"
            >
              Kembali ke atas
              <FaArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;