'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
// import { GoogleGenAI, Modality } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qunlvbcbdxdbyhzqlzor.supabase.co"

const supabase = createClient(
  SUPABASE_URL,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1bmx2YmNiZHhkYnloenFsem9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMjA5OTMsImV4cCI6MjA3MTg5Njk5M30.IJcWQU0xe_2DQhFSqHMjehQtI-pOVutj4mCiCC_egd4'
);

type EmergingCardProps = {
  revealed: boolean;
  onReset: () => void
  icons: number[];
};

async function GenerateCardText({ icons }: EmergingCardProps) {
  var textPrompt = ""
  var imagePrompt = ""
  var textResponse = ""

  if (icons[0] === icons[1] && icons[1] === icons[2]) {
    textPrompt = "Generate ONLY one pair of latitude and longitue coordinates of a random location where a lesser-known great mystery occured"
    imagePrompt = "Generate a 256x256 stock image of a large non-pig farm animal with a heavenly glow wearing 3 huge hats on top of each other"
  }
  else if (icons[0] === icons[1] || icons[1] === icons[2] || icons[0] === icons[2]) {
    textPrompt = "Generate ONLY one short, esoteric phrase from existing literature"
    imagePrompt = "Generate a 256x256 stock image of a small non-pig animal wearing two hats on top of each other"
  }
  else {
    textPrompt = "Generate ONLY one random uncommon zoo animal noise"
    imagePrompt = "Generate a 256x256 stock image of a small pig wearing a hat"
  }

  // TODO: move this to supabase
  // const imageResponse = await imageAI.models.generateContent({
  //   model: "gemini-2.0-flash-preview-image-generation",
  //   contents: imagePrompt,
  //   config: {
  //     responseModalities: [Modality.TEXT, Modality.IMAGE],
  //     thinkingConfig: {thinkingBudget: 0}
  //   }
  // });

  const { data } = await supabase.functions.invoke('gemini-proxy', {
    body: { name: 'Functions', tPrompt: textPrompt },
  });
  textResponse = data.candidates[0].content.parts[0].text;

  return textResponse;
}

export function EmergingCard({ revealed, onReset, icons }: EmergingCardProps) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;

    async function generateText() {
      if (!revealed) return;

      setIsLoading(true);
      setError(null);
      setGeneratedText('');

      try {
        const response = await GenerateCardText({ revealed, onReset, icons });
        if (!aborted) {
          setGeneratedText(response || 'No text generated');
        }
      } catch (err: any) {
        if (!aborted) {
          setError(err?.message || 'Failed to generate text');
        }
      } finally {
        if (!aborted) {
          setIsLoading(false);
        }
      }
    }

    generateText();

    return () => {
      aborted = true;
    };
  }, [revealed, icons, onReset]);

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
          {isLoading ? (
            <p className="text-foreground/60">Generating text...</p>
          ) : error ? (
            <p className="text-red-400">Error: {error}</p>
          ) : generatedText ? (
            <p className="text-foreground/80 whitespace-pre-wrap">{generatedText}</p>
          ) : (
            <p className="text-foreground/60">No text generated</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
