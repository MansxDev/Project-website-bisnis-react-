import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { formatCurrency } from '../../utils/format.js';
import { useStore, KEYS } from '../../data/store.js';

const ServiceCard = ({ service }) => {
  const [elementRef, isVisible] = useScrollAnimation(0.15);
  const settings = useStore(KEYS.settings);

  return (
    <div
      ref={elementRef}
      className={`card w-80 shrink-0 scroll-animation bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
        isVisible ? 'show' : ''
      }`}
    >
      <figure className="px-4 pt-4">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-44 object-cover rounded-xl"
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{service.name}</h3>
        <p className="text-sm text-base-content/70">{service.description}</p>
        <ul className="list-disc list-inside text-sm mt-2 text-base-content/80 space-y-1">
          {service.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-base-content/50">Mulai dari</span>
            <div>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(service.price)}
              </span>
              <span className="text-sm text-base-content/60">{service.interval || ''}</span>
            </div>
          </div>
          <a
            href={`https://wa.me/${settings.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Konsultasi
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;