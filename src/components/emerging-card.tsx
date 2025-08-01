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
        'absolute bottom-[1%] left-1/2 -translate-x-1/2 w-[280px] h-[680px] cursor-pointer group',
        'transition-all duration-1000 ease-&lsqb;cubic-bezier(0.68,-0.55,0.27,1.55)&rsqb',
        'origin-bottom',
        revealed
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-[20px] scale-95 pointer-events-none'
      )}
      style={{ perspective: '1000px' }}
    >
      <Card
        style={cardStyle}
        className={cn(
          'w-full h-full bg-black/30 backdrop-blur-sm border-2 border-accent/50 shadow-2xl shadow-accent/20 text-center flex flex-col justify-center items-center'
        )}
      >
        <CardHeader>
          <CardTitle className="font-headline text-accent flex items-center gap-2">
            <Sparkles className="w-6 h-6" /> Gleep name
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">Gleep card text</p>
        </CardContent>
      </Card>
    </div>
  );
}
