'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const images = [
  '/images/landingcarouselle/1.jpg',
  '/images/landingcarouselle/2.jpg',
  '/images/landingcarouselle/3.jpg',
  '/images/landingcarouselle/4.jpg'
];

export default function ImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {images.map((src, index) => (
        <div 
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <Image 
            src={src} 
            alt={`Background image ${index + 1}`}
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
        </div>
      ))}
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: 'linear-gradient(135deg, rgba(0, 119, 204, 0.10), rgba(76, 175, 80, 0.75), rgba(0, 86, 179, 0.85), rgba(0, 119, 204, 0.85))',
          backgroundSize: '400% 400%',
          animation: 'gradientAnimation 15s ease infinite'
        }}
      />
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
