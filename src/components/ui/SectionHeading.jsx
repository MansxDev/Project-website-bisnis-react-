import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';

const SectionHeading = ({ title, subtitle }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`text-center mb-10 scroll-animation ${isVisible ? 'show' : ''}`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-base-content/60 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;