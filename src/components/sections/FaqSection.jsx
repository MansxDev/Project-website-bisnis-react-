import React, { useState } from 'react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { useCollection, KEYS } from '../../data/store.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { FaChevronDown } from 'react-icons/fa6';

const FaqSection = () => {
  const { data: faqs } = useCollection(KEYS.faqs);
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  return (
    <section className="container mx-auto px-4 py-10" id="faq-section">
      <SectionHeading
        title="Pertanyaan Umum"
        subtitle="Temukan jawaban atas pertanyaan yang sering diajukan."
      />

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <FaqItem
              key={faq.id}
              faq={faq}
              index={index}
              isOpen={isOpen}
              onToggle={() => setOpenIndex(isOpen ? null : index)}
            />
          );
        })}
      </div>
    </section>
  );
};

const FaqItem = ({ faq, index, isOpen, onToggle }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`scroll-animation bg-base-100 border ${
        isOpen ? 'border-primary' : 'border-base-200'
      } rounded-2xl shadow-lg overflow-hidden ${isVisible ? 'show' : ''}`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${faq.id}`}
      >
        <span className="flex items-center gap-3">
          <span className="text-sm font-bold text-primary font-display">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold font-display">{faq.question}</span>
        </span>
        <FaChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div
          id={`faq-panel-${faq.id}`}
          className="px-5 pb-5 pl-12 text-sm text-base-content/70 leading-relaxed"
        >
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default FaqSection;