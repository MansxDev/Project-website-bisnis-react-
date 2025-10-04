import React from 'react';
import ServiceCard from './ServiceCard.jsx';


const ServiceSection = ({ services }) => {
  return (
    <section className="container mx-auto px-4 py-10" id="service-section">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-white">Layanan Kami</h2>

      <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4
                  md:grid md:grid-cols-2 md:gap-6 md:space-x-0
                  lg:grid-cols-3 lg:gap-8">
        {services.map(service => (
          <div key={service.id} className="shrink-0 w-80 md:w-auto">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;