import React from 'react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { useCollection, KEYS } from '../../data/store.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { FaStar, FaQuoteLeft } from 'react-icons/fa6';

const RatingStars = ({ rating }) => (
  <div className="flex gap-0.5 text-warning" aria-label={`Rating ${rating} dari 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <FaStar key={i} className={`w-4 h-4 ${i <= rating ? '' : 'opacity-25'}`} />
    ))}
  </div>
);

const TestimonialSection = () => {
  const { data: testimonials } = useCollection(KEYS.testimonials);

  if (!testimonials.length) return null;

  return (
    <section className="container mx-auto px-4 py-10" id="testimonial-section">
      <SectionHeading
        title="Apa Kata Mereka"
        subtitle="Contoh tampilan seksi testimoni. Nama dan isi di bawah ini data contoh — bukan dari klien sungguhan."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
        ))}
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`scroll-animation card bg-base-100 border border-base-200 shadow-xl p-6 ${
        isVisible ? 'show' : ''
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <FaQuoteLeft className="w-8 h-8 text-primary/30 mb-3" />
      <p className="text-base-content/80 leading-relaxed">"{testimonial.message}"</p>
      <div className="mt-5 pt-4 border-t border-base-200 flex items-center justify-between">
        <div>
          <p className="font-bold font-display">{testimonial.name}</p>
          <p className="text-sm text-base-content/60">{testimonial.role}</p>
        </div>
        <RatingStars rating={testimonial.rating || 5} />
      </div>
    </div>
  );
};

export default TestimonialSection;