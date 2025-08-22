'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { GoogleGenAI, Modality } from '@google/genai';
// import dotenv from 'dotenv';
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_FLASH_KEY;

export const textAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});
export const imageAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

type EmergingCardProps = {
  revealed: boolean;
  onReset: () => void;
  icons: number[];
};

async function GenerateCardText({icons} : EmergingCardProps) {
  var textPrompt = ""
  var imagePrompt = ""
   
  if (icons[0] === icons[1] && icons[1] === icons[2]) {
    textPrompt = "Generate a short funny limerick and cite a famous religious or war figure"
    imagePrompt = "Generate a 256x256 stock image of a large non-pig farm animal with a heavenly glow wearing 3 huge hats on top of each other"
  }
  else if (icons[0] === icons[1] || icons[1] === icons[2] || icons[0] === icons[2]) {
    textPrompt = "Generate a funny haiku and site and cite a celebrity"
    imagePrompt = "Generate a 256x256 stock image of a small non-pig animal wearing two hats on top of each other"
  }
  else {
    textPrompt = "Generate a short funny phrase and cite a politician"
    imagePrompt = "Generate a 256x256 stock image of a small pig wearing a hat"
  }

  // const imageResponse = await imageAI.models.generateContent({
  //   model: "gemini-2.0-flash-preview-image-generation",
  //   contents: imagePrompt,
  //   config: {
  //     responseModalities: [Modality.TEXT, Modality.IMAGE],
  //     thinkingConfig: {thinkingBudget: 0}
  //   }
  // });

  const textResponse = await textAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: textPrompt,
    config: {
      thinkingConfig: {thinkingBudget: 0}
    }
  });

  return textResponse;
}

export function EmergingCard({ revealed, onReset, icons }: EmergingCardProps) {
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
          <img src="/test.png" alt="Gleep" />
        </CardHeader>
        <CardContent>
          <p>Example Text</p>
        </CardContent>
      </Card>
    </div>
  );
}
