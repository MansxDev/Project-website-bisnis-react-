import React from 'react';
import BlurText from './animations/BlurText.js'; 
import RotatingText from './animations/RotatingText'; 

const HeroSection = ({ scrollToSection }) => {
    const handleBlurAnimationComplete = () => {
        console.log('Animation completed!');
    };

  return (

    <div className="hero min-h-screen text-gray-800 dark:text-white py-10 flex items-center justify-center">
      <div className="hero-content text-center">

        <div className="max-w-xs sm:max-w-md md:max-w-lg mx-auto">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Halo Semuanya</h1>


          <p className="py-4 sm:py-6 text-base sm:text-lg md:text-xl leading-relaxed mb-8">
             <BlurText
                text="Website Yang Menyediakan all kebutuhan kamu"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleBlurAnimationComplete}
                className="inline-block"
             />
             
             <RotatingText
                texts={['klik', 'tombol', 'di', 'bawah']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-yellow-500 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
            />
           </p>

          <button className="btn btn-primary animated-glow" onClick={() => scrollToSection('#product-section')}>Mulai Sekarang</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;