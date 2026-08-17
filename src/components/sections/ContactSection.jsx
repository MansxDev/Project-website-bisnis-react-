import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaWhatsapp, FaLocationDot } from 'react-icons/fa6';
import SectionHeading from '../ui/SectionHeading.jsx';
import { useStore, useCollection, KEYS } from '../../data/store.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import toast from 'react-hot-toast';

const ContactSection = () => {
  const settings = useStore(KEYS.settings);
  const { add } = useCollection(KEYS.messages);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formRef, formVisible] = useScrollAnimation(0.1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Lengkapi nama, email, dan pesan Anda.');
      return;
    }
    add({
      id: `msg_${Date.now()}`,
      name: form.name,
      email: form.email,
      subject: form.subject || 'Tanpa subjek',
      message: form.message,
      date: new Date().toISOString(),
      read: false,
    });
    toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const formatPhone = (p) => {
    const num = p.replace(/^0/, '62');
    return `+${num.slice(0, 2)} ${num.slice(2, 5)}-${num.slice(5, 9)}-${num.slice(9, 13)}`;
  };

  const infoCards = [
    {
      title: 'Email',
      desc: 'Kirimkan pesan Anda melalui email.',
      value: settings.email,
      href: `mailto:${settings.email}`,
      btnClass: 'btn-primary',
      icon: <FaEnvelope className="w-6 h-6" />,
    },
    {
      title: 'WhatsApp',
      desc: 'Hubungi kami langsung via WhatsApp.',
      value: formatPhone(settings.phone),
      href: `https://wa.me/${settings.phone}`,
      btnClass: 'btn-success',
      external: true,
      icon: <FaWhatsapp className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16" id="contact">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeading
          title="Hubungi Kami"
          subtitle="Punya pertanyaan atau ingin mulai proyek? Kirim pesan dan kami akan membalas secepatnya."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div
            ref={formRef}
            className={`lg:col-span-3 bg-base-100 border border-base-200 rounded-3xl shadow-xl p-6 sm:p-8 scroll-animation ${
              formVisible ? 'show' : ''
            }`}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Nama</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Nama Anda"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered"
                    placeholder="email@contoh.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subjek</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Konsultasi website, VPS, dll."
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Pesan</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  rows={4}
                  placeholder="Tulis pesan Anda di sini..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                <FaPaperPlane className="w-4 h-4" />
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="bg-base-100 border border-base-200 rounded-3xl shadow-xl p-6 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-primary mb-3">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold font-display mb-1">{card.title}</h3>
                <p className="text-sm text-base-content/60 mb-4">{card.desc}</p>
                <a
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  className={`btn ${card.btnClass} btn-sm`}
                >
                  {card.value}
                </a>
              </div>
            ))}

            <div className="bg-base-100 border border-base-200 rounded-3xl shadow-xl p-6">
              <div className="flex items-center gap-3 text-base-content/70">
                <FaLocationDot className="w-5 h-5 text-secondary" />
                <span className="text-sm">Melayani klien dari seluruh Indonesia.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;