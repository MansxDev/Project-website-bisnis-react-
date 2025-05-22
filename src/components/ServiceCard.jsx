import React from 'react';
import {
 useScrollAnimation
} from '../utils/utils.js';

const ServiceCard = ({ service }) => {
    const [elementRef, isVisible] = useScrollAnimation(0.2);

    const animationClasses = isVisible ? 'show' : '';

    const cardClasses = `card w-80 shrink-0 scroll-animation bg-base-100 dark:bg-gray-800 shadow-xl ${animationClasses}`;

  return (
    <div ref={elementRef} className={cardClasses}>
      {/* Menggunakan service.image di sini */}
      <figure><img src={service.image} alt={service.name} className="min-w-full h-48 object-cover"/></figure>
      <div className="card-body">
        <h3 className="card-title">{service.name}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">{service.description}</p>
        <ul className="list-disc list-inside text-sm mt-2 text-gray-700 dark:text-gray-300">
           {service.features.map((feature, index) => (
               <li key={index}>{feature}</li>
           ))}
        </ul>
        <div className="mt-4">
          <span className="text-xl font-bold text-primary">{`Mulai Rp${service.price.toLocaleString('id-ID')}${service.interval || ''}`}</span>
          <button className="btn btn-primary btn-sm mt-2">Konsultasi Sekarang</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;