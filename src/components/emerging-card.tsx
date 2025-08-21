'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Sparkles } from 'lucide-react';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// export const ai = genkit({
//   plugins: [googleAI()],
//   model: 'googleai/gemini-2.0-flash',
// });

type EmergingCardProps = {
  revealed: boolean;
  onReset: () => void;
};

export function EmergingCard({ revealed, onReset }: EmergingCardProps) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = -15 * ((y - height / 2) / (height / 2));
    const rotateY = 15 * ((x - width / 2) / (width / 2));

    setRotation({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ rotateX: 0, rotateY: 0 });
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <div
      onClick={onReset}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[384px] h-[512px] cursor-pointer group',
        'transition-all duration-1000',
        'origin-center',
        revealed
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none'
      )}
      style={{ perspective: '1000px' }}
    >
      <Card
        style={cardStyle}
        className={cn(
          'w-[384px] h-[512px] bg-black/30 backdrop-blur-sm border-2 border-accent/50 shadow-2xl shadow-accent/20 text-center flex flex-col justify-center items-center'
        )}
      >
        <CardHeader>
          <CardTitle className="font-headline text-accent flex items-center gap-2">
            <h2>Gleep</h2>
          </CardTitle>
          <img src="/test.png" alt="Gleep"/>
        </CardHeader>
        <CardContent>
          <p>Here is some placeholder text lorem ipsum dolor etc blah blah blah blah</p>
        </CardContent>
      </Card>
    </div>
  );
}
