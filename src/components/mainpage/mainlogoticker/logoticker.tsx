'use client';

import Image from 'next/image';
import acmeLogo from '@/assets/logotickerimages/logo-acme.png';
import quantumLogo from '@/assets/logotickerimages/logo-quantum.png';
import echoLogo from '@/assets/logotickerimages/logo-echo.png';
import celestialLogo from '@/assets/logotickerimages/logo-celestial.png';

const logos = [
  { src: acmeLogo, alt: 'Acme Logo' },
  { src: quantumLogo, alt: 'Quantum Logo' },
  { src: echoLogo, alt: 'Echo Logo' },
  { src: celestialLogo, alt: 'Celestial Logo' },
];

export default function LogoTicker() {
  return (
    <div className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 4xl:px-96 max-w-screen-4xl">
        <div className="relative w-full overflow-hidden">
          {/* Animated Ticker Wrapper */}
          <div className="flex items-center gap-10 md:gap-16 lg:gap-24 xl:gap-32 4xl:gap-48 ticker">
            {/* Duplicate logos for a seamless infinite scrolling effect */}
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  className="w-24 md:w-32 lg:w-40 xl:w-48 4xl:w-72 h-auto object-contain"
                  width={192}
                  height={120}
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 4000px) 192px, (max-width: 8000px) 256px, 320px"
                  priority={index < 4}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animation for smooth infinite scrolling */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .ticker {
          display: flex;
          white-space: nowrap;
          animation: scroll 15s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}