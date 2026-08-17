import React from 'react';
import {
  FaBoxOpen,
  FaLayerGroup,
  FaQuoteLeft,
  FaCircleQuestion,
  FaTicket,
  FaEnvelopeOpenText,
} from 'react-icons/fa6';
import { useStore, KEYS } from '../../../data/store.js';
import { FaShieldHalved } from 'react-icons/fa6';

const AdminDashboard = () => {
  const products = useStore(KEYS.products);
  const services = useStore(KEYS.services);
  const testimonials = useStore(KEYS.testimonials);
  const faqs = useStore(KEYS.faqs);
  const promos = useStore(KEYS.promos);
  const messages = useStore(KEYS.messages);
  const audit = useStore(KEYS.audit);

  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { label: 'Produk', value: products.length, icon: <FaBoxOpen />, color: 'text-primary' },
    { label: 'Layanan', value: services.length, icon: <FaLayerGroup />, color: 'text-secondary' },
    { label: 'Testimoni', value: testimonials.length, icon: <FaQuoteLeft />, color: 'text-accent' },
    { label: 'FAQ', value: faqs.length, icon: <FaCircleQuestion />, color: 'text-info' },
    { label: 'Kupon Aktif', value: promos.filter((p) => p.active).length, icon: <FaTicket />, color: 'text-warning' },
    { label: 'Pesan Belum Dibaca', value: unread, icon: <FaEnvelopeOpenText />, color: 'text-error' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold font-display mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-base-100 border border-base-200 rounded-2xl shadow-lg p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center ${stat.color}`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-bold font-display">{stat.value}</p>
              <p className="text-xs text-base-content/60">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-base-100 border border-base-200 rounded-2xl shadow-lg p-6">
        <h3 className="font-bold font-display mb-3">Pesan Terbaru</h3>
        {messages.length === 0 ? (
          <p className="text-sm text-base-content/50">Belum ada pesan masuk.</p>
        ) : (
          <ul className="space-y-3">
            {[...messages]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((msg) => (
                <li key={msg.id} className="flex items-start justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-error inline-block mr-2" />}
                      {msg.name} <span className="text-base-content/50">· {msg.subject}</span>
                    </p>
                    <p className="text-base-content/60 truncate">{msg.message}</p>
                  </div>
                  <span className="text-xs text-base-content/40 shrink-0">
                    {new Date(msg.date).toLocaleDateString('id-ID')}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    <div className="mt-6 bg-base-100 border border-base-200 rounded-2xl shadow-lg p-6">
        <h3 className="font-bold font-display flex items-center gap-2 mb-3">
          <FaShieldHalved className="text-primary" />
          Log Aktivitas
        </h3>
        {audit.length === 0 ? (
          <p className="text-sm text-base-content/50">Belum ada aktivitas tercatat.</p>
        ) : (
          <ul className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {audit.map((entry) => (
              <li key={entry.id} className="flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="font-semibold">{entry.action}</p>
                  {entry.detail && (
                    <p className="text-base-content/60 truncate">{entry.detail}</p>
                  )}
                </div>
                <span className="text-xs text-base-content/40 shrink-0">
                  {new Date(entry.date).toLocaleString('id-ID', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;