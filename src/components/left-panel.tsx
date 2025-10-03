'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Gem, Star, Cherry } from 'lucide-react';

export function LeftPanel() {
  return (
    <div className="w-80 h-full flex flex-col gap-4">
      <Card className="bg-black/30 backdrop-blur-sm border-2 border-accent/50 shadow-2xl shadow-accent/20">
        <CardHeader>
          <CardTitle className="font-headline text-accent text-center">
            Card Prompts Explained
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Gem className="w-4 h-4 text-accent" />
                <Gem className="w-4 h-4 text-accent" />
                <Gem className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground/80">Three of a Kind</span>
            </div>
            <p className="text-xs text-foreground/60 pl-6">
              Generates a level 3 gleep (coordinates + a pig wearing three hats)
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Star className="w-4 h-4 text-accent" />
                <Star className="w-4 h-4 text-accent" />
                <Cherry className="w-4 h-4 text-foreground/40" />
              </div>
              <span className="text-sm font-medium text-foreground/80">Two of a Kind</span>
            </div>
            <p className="text-xs text-foreground/60 pl-6">
              Generates a level 2 gleep (esoteric literary phrase + a pig wearing two hats)
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Gem className="w-4 h-4 text-foreground/40" />
                <Star className="w-4 h-4 text-foreground/40" />
                <Cherry className="w-4 h-4 text-foreground/40" />
              </div>
              <span className="text-sm font-medium text-foreground/80">No Match</span>
            </div>
            <p className="text-xs text-foreground/60 pl-6">
              Generates a level 1 gleep (random zoo animal noise + a pig wearing one hat)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/30 backdrop-blur-sm border-2 border-accent/50 shadow-2xl shadow-accent/20">
        <CardHeader>
          <CardTitle className="font-headline text-accent text-center text-medium">
            How to Play
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="text-xs text-foreground/60 space-y-2">
            <li>1. Click the "slot machine" to spin</li>
            <li>2. Watch the reels spin and stop</li>
            <li>3. Wait for your new "gleep" come to life</li>
            <li>4. Optionally download your card as a PNG</li>
            <li>5. Optionally click the card to try again!</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
