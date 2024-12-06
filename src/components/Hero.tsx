import { Plane, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2074',
  'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=2070',
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [planePosition, setPlanePosition] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    const planeInterval = setInterval(() => {
      setPlanePosition((prev) => (prev + 1) % 100);
    }, 50);

    return () => {
      clearInterval(imageInterval);
      clearInterval(planeInterval);
    };
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {HERO_IMAGES.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="relative z-10 text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Predict Your Flight Fare
              <span className="absolute -right-16 top-0">
                <Plane
                  className="h-12 w-12 transform -rotate-45 animate-pulse"
                  style={{
                    transform: `translate(${planePosition}px, ${Math.sin(planePosition / 10) * 20}px) rotate(-45deg)`,
                  }}
                />
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Get accurate fare predictions for your next journey across India with our AI-powered tool
            </p>
            <a
              href="#prediction"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors group"
            >
              Start Prediction
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}