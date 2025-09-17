'use client';

import { useState, useCallback, useEffect } from 'react';
import type { ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { Cherry, Gem, Star, Citrus, Bell, Crown, Rocket } from 'lucide-react';
import { EmergingCard } from './emerging-card';

const icons: ComponentType<{ className?: string }>[] = [Gem, Star, Cherry, Citrus, Bell, Crown, Rocket];

const Reel = ({ spinning, finalIconIndex, delay }: { spinning: boolean, finalIconIndex: number, delay: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (spinning) {
      const spinInterval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % icons.length);
      }, 100);

      const stopTimeout = setTimeout(() => {
        clearInterval(spinInterval);
        setCurrentIndex(finalIconIndex);
      }, delay);

      return () => {
        clearInterval(spinInterval);
        clearTimeout(stopTimeout);
      };
    } else {
      setCurrentIndex(finalIconIndex);
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

export function SlotMachine() {
  const [state, setState] = useState<'idle' | 'spinning' | 'revealed'>('idle');
  const [finalIndices, setFinalIndices] = useState<number[]>([0, 0, 0]);

  const handleClick = useCallback(() => {
    if (state === 'spinning') {
      return;
    }

    if (state === 'revealed') {
      setState('idle');
      return;
    }

    setTimeout(() => { 
      setState('spinning'); 
    }, 100);

  }, [state]);

  const handleReset = useCallback(() => {
    if (state === 'revealed') { 
      setState('idle'); 
    }
  }, [state]);

  useEffect(() => {
    if (state === 'spinning') {
      const newIndices = [
        Math.floor(Math.random() * icons.length),
        Math.floor(Math.random() * icons.length),
        Math.floor(Math.random() * icons.length),
      ];
      setFinalIndices(newIndices);

      const timer = setTimeout(() => { 
        setState('revealed'); 
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="relative" style={{ perspective: '1200px' }}>
      <div
        onClick={handleClick}
        className="relative w-[340px] h-[550px] sm:w-[400px] sm:h-[600px] transform-style-3d transition-all duration-500 cursor-pointer group"
        style={{ transform: 'rotateY(15deg) rotateX(10deg)' }}
      >
        {/* Main Body */}
        <div className={cn(
          "absolute inset-0 rounded-t-3xl rounded-b-xl bg-primary border-4 border-black shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_60px_15px_hsl(var(--accent)/0.7)]",
          state === 'spinning' && 'animate-rumble'
        )}>
          {/* Side Panel for 3D effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/60 origin-left transform -translate-x-full rotate-y-90" style={{ width: '60px' }}>
            <div className="w-full h-full bg-gradient-to-r from-black/80 to-black/20" />
          </div>

          {/* Top Section */}
          <div className="absolute top-0 w-full h-24 bg-black/30 rounded-t-2xl flex items-center justify-center border-b-4 border-black">
            <h2 className="font-headline text-xl sm:text-4xl text-accent/80 tracking-widest uppercase" style={{ textShadow: '0 0 15px hsl(var(--accent))' }}>
              Gleepinator6000
            </h2>
          </div>

          {/* Reels Window */}
          <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[90%] h-[120px] sm:h-[130px] bg-black/70 rounded-lg border-4 border-black p-4 flex justify-around items-center overflow-hidden shadow-inner shadow-black/80">
            <div className="w-full h-full bg-grid-zinc-400/10 [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]">
              <div className="flex w-full h-full">
                <Reel spinning={state === 'spinning'} finalIconIndex={finalIndices[0]} delay={2000} />
                <Reel spinning={state === 'spinning'} finalIconIndex={finalIndices[1]} delay={2500} />
                <Reel spinning={state === 'spinning'} finalIconIndex={finalIndices[2]} delay={3000} />
              </div>
            </div>
          </div>

          {/* Card Tray Area */}
          <div className="absolute top-[320px] sm:top-[330px] left-1/2 -translate-x-1/2 w-3/4">
            <div className="h-2 w-full bg-black rounded-full" />
            <div className="h-10 w-[80%] mx-auto bg-gradient-to-b from-black/80 to-black/30 border-x-4 border-black" />
          </div>

          {/* Base */}
          <div className="absolute bottom-0 w-full h-12 bg-black/50 border-t-4 border-black" />
        </div>
      </div>
      <EmergingCard revealed={state === 'revealed'} onReset={handleReset} icons={finalIndices} />
    </div>
  );
}
