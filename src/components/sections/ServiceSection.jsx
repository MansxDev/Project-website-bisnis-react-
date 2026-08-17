import React from 'react';
import ServiceCard from '../ui/ServiceCard.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

const ServiceSection = ({ services }) => {
  return (
    <section className="container mx-auto px-4 py-10" id="service-section">
      <SectionHeading
        title="Layanan Kami"
        subtitle="Layanan profesional untuk mengembangkan bisnis dan kehadiran digital Anda."
      />

      <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;