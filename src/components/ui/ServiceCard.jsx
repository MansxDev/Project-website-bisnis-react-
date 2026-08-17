import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { formatCurrency } from '../../utils/format.js';
import { useStore, KEYS } from '../../data/store.js';
import { FaCheck } from 'react-icons/fa6';

const ServiceCard = ({ service }) => {
  const [elementRef, isVisible] = useScrollAnimation(0.15);
  const settings = useStore(KEYS.settings);

  return (
    <div
      ref={elementRef}
      className={`card w-80 shrink-0 scroll-animation bg-base-100 shadow-sm border transition-all duration-300 ${
        service.popular
          ? 'border-primary shadow-xl shadow-primary/10'
          : 'border-base-200 hover:shadow-xl hover:-translate-y-1'
      } ${isVisible ? 'show' : ''}`}
    >
      <div className="card-body">
        {service.popular && (
          <span className="badge badge-warning badge-xs self-start">Most Popular</span>
        )}
        <div className="flex flex-wrap justify-between items-start gap-2">
          <h2 className="text-xl font-bold font-display leading-tight">{service.name}</h2>
          <span className="text-lg font-bold text-primary whitespace-nowrap">
            {formatCurrency(service.price)}
            <span className="text-xs font-medium text-base-content/50">
              {service.interval || ''}
            </span>
          </span>
        </div>
        <p className="text-xs text-base-content/70">{service.description}</p>
        <ul className="mt-4 flex flex-col gap-2 text-xs">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <FaCheck className="size-4 mt-0.5 text-success shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <a
            href={`https://wa.me/${settings.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-block"
          >
            Konsultasi
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;