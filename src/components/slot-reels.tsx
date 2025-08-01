'use client';

import { Cherry, Gem, Star, Citrus, Bell, Crown, Rocket } from 'lucide-react';
import type { ComponentType } from 'react';
import { useState, useEffect } from 'react';

type SlotReelsProps = {
  spinning: boolean;
};

const icons: ComponentType<{ className?: string }>[] = [Gem, Star, Cherry, Citrus, Bell, Crown, Rocket];

const Reel = ({ spinning, finalIconIndex, delay }: { spinning: boolean, finalIconIndex: number, delay: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (spinning) {
      const spinInterval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % icons.length);
      }, 100);

      // Stop spinning after a delay
      const stopTimeout = setTimeout(() => {
        clearInterval(spinInterval);
        setCurrentIndex(finalIconIndex);
      }, delay); 

      return () => {
        clearInterval(spinInterval);
        clearTimeout(stopTimeout);
      };
    }
  }, [spinning, finalIconIndex, delay]);

  const Icon = icons[currentIndex];

  return (
    <div className="relative h-full w-1/3 flex items-center justify-center overflow-hidden">
        <div className="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center shrink-0">
          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-foreground/80 drop-shadow-lg" />
        </div>
    </div>
  );
};

export function SlotReels({ spinning }: SlotReelsProps) {
  const [finalIndices, setFinalIndices] = useState([0, 0, 0]);

  useEffect(() => {
    if (spinning) {
      setFinalIndices([
        Math.floor(Math.random() * icons.length),
        Math.floor(Math.random() * icons.length),
        Math.floor(Math.random() * icons.length),
      ]);
    }
  }, [spinning]);

  return (
    <div className="flex w-full h-full">
      <Reel spinning={spinning} finalIconIndex={finalIndices[0]} delay={2000} />
      <Reel spinning={spinning} finalIconIndex={finalIndices[1]} delay={2500} />
      <Reel spinning={spinning} finalIconIndex={finalIndices[2]} delay={3000} />
    </div>
  );
}
