'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Download } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import html2canvas from 'html2canvas';

const SUPABASE_URL = "https://qunlvbcbdxdbyhzqlzor.supabase.co"

const supabase = createClient(
  SUPABASE_URL,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1bmx2YmNiZHhkYnloenFsem9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMjA5OTMsImV4cCI6MjA3MTg5Njk5M30.IJcWQU0xe_2DQhFSqHMjehQtI-pOVutj4mCiCC_egd4'
);

type EmergingCardProps = {
  revealed: boolean;
  onReset: () => void;
  icons: number[];
};

async function GenerateCardText({ icons }: Pick<EmergingCardProps, 'icons'>) {
  let textPrompt = ""
  let imagePrompt = ""

  if (icons[0] === icons[1] && icons[1] === icons[2]) {
    textPrompt = "Generate ONLY one pair of latitude and longitue coordinates of a random location where a lesser-known great mystery occured"
    imagePrompt = "Generate a 300x300 photorealistic stock image of a small pink pig with a heavenly glow wearing EXACTLY 3 hats on top of each other"
  }
  else if (icons[0] === icons[1] || icons[1] === icons[2] || icons[0] === icons[2]) {
    textPrompt = "Generate ONLY one short, esoteric phrase from existing literature DON'T specify the author"
    imagePrompt = "Generate a 300x300 photorealistic stock image of a small pink pig wearing EXACTLY 2 hats on top of each other"
  }
  else {
    textPrompt = "Generate ONLY one random uncommon zoo animal noise"
    imagePrompt = "Generate a 300x300 photorealistic stock image of a small pink pig wearing EXACTLY 1 hat"
  }

  let { data, error } = await supabase.functions.invoke('gemini-proxy', {
    body: { name: 'Functions', tPrompt: textPrompt, iPrompt: "" },
  });

  const textResponse = (error) ? `Supabase function error: ${error.message}` : data.candidates[0].content.parts[0].text;

  ({ data, error } = await supabase.functions.invoke('gemini-proxy', {
    body: { name: 'Functions', tPrompt: "", iPrompt: imagePrompt },
  }));

  const imageResponse = (error) ? `Supabase function error: ${error.message}` : data;

  return [textResponse, imageResponse];
}

export function EmergingCard({ revealed, onReset, icons }: EmergingCardProps) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
  const [generatedText, setGeneratedText] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let aborted = false;

    async function generateContent() {
      if (!revealed) return;

      setIsLoading(true);
      setError(null);
      setGeneratedText('');
      setGeneratedImage('');

      try {
        const [text, image] = await GenerateCardText({ icons });
        if (!aborted) {
          setGeneratedText(text || 'No text generated');
          setGeneratedImage(image || 'No image generated');
          
          setIsTransitioning(true);
          setIsLoading(false);
          
          if (cardRef.current) {
            const card = cardRef.current;
            card.style.animation = 'none';
            card.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
          }
          
          setRotation({ rotateX: 0, rotateY: 0 });
          setTimeout(() => setIsTransitioning(false), 1000);
        }
      } catch (err: any) {
        if (!aborted) {
          setError(err?.message || 'Failed to generate content');
          
          setIsTransitioning(true);
          setIsLoading(false);
          
          if (cardRef.current) {
            const card = cardRef.current;
            card.style.animation = 'none';
            card.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
          }
          
          setRotation({ rotateX: 0, rotateY: 0 });
          setTimeout(() => setIsTransitioning(false), 1000);
        }
      }
    }

    generateContent();
    return () => { aborted = true; };
  }, [revealed, icons]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!cardRef.current || isLoading) return;
    
    setIsDownloading(true);
    
    try {
      const originalStyle = cardRef.current.style.transform;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      cardRef.current.style.transform = originalStyle;
      
      const link = document.createElement('a');
      link.download = `gleep-card-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Failed to download card:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLoading || isTransitioning) return;
    
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = -15 * ((y - height / 2) / (height / 2));
    const rotateY = 15 * ((x - width / 2) / (width / 2));

    setRotation({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    if (!isLoading && !isTransitioning) {
      setRotation({ rotateX: 0, rotateY: 0 });
    }
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
      <style jsx>{`
        @keyframes spin-y {
          from {
            transform: perspective(1000px) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateY(360deg);
          }
        }
      `}</style>
      
      <Card
        ref={cardRef}
        style={{
          transform: isLoading 
            ? 'perspective(1000px)' 
            : `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
          transition: isLoading 
            ? 'none' 
            : 'transform 0.1s ease-out',
          animation: isLoading ? 'spin-y 2s linear infinite' : 'none'
        }}
        className="w-[384px] h-[512px] bg-black/30 backdrop-blur-sm border-2 border-accent/50 shadow-2xl shadow-accent/20 text-center flex flex-col justify-center items-center relative"
      >
        {revealed && !isLoading && (
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={cn(
              "absolute top-4 right-4 z-10",
              "flex items-center gap-1 px-2 py-1.5",
              "bg-black/40 hover:bg-black/60 border border-accent/50",
              "text-accent text-xs font-medium",
              "rounded-md transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "backdrop-blur-sm"
            )}
          >
            <Download size={12} />
            {isDownloading ? 'Saving...' : 'PNG'}
          </button>
        )}
        {isLoading ? (
          <div className="w-full h-full" />
        ) : (
          <>
            <CardHeader>
              <CardTitle className="font-headline text-accent flex items-center gap-2">
                <h2>Gleep</h2>
              </CardTitle>
              {generatedImage && generatedImage.startsWith('data:image/') ? (
                <img src={generatedImage} alt="Generated Gleep" className="w-64 h-64 object-contain" />
              ) : (
                <img src="/test.png" alt="Gleep" />
              )}
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-red-400">Error: {error}</p>
              ) : generatedText ? (
                <p className="text-foreground/80 whitespace-pre-wrap">{generatedText}</p>
              ) : (
                <p className="text-foreground/60">No text generated</p>
              )}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}