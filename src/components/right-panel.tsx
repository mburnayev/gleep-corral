'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Github, Linkedin } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/mburnayev',
    color: 'hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/misha-burnayev/',
    color: 'hover:text-blue-500'
  }
];

export function RightPanel() {
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-80 h-full flex flex-col gap-4">
            <Card className="bg-black/30 backdrop-blur-sm border-2 border-accent/50 shadow-2xl shadow-accent/20">
        <CardHeader>
          <CardTitle className="font-headline text-accent text-center text-medium">
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-foreground/60 text-left leading-relaxed">
            Gleep Corral is a silly project I brainstormed to start coding again after a hiatus with
            the goal to explore generative AI in a way that entertained me and those that happen upon it.
            <br></br><br></br>
            The slot machine creates a "gleep" based on the number of identical symbols that appear on the
            reels — the left panel explains the textual and visual prompts used to make the gleeps.
            <br></br><br></br>
            One tiny issue I ran into is that the cloudflare flux-1-schnell model doesn't follow the provisioned
            prompts as rigorously as other models I tested with, but it's a fair compromise considering it's free
            and hosted in the cloud.
          </p>
        </CardContent>
      </Card>
      <Card className="bg-black/30 backdrop-blur-sm border-2 border-accent/50 shadow-2xl shadow-accent/20">
        <CardHeader>
          <CardTitle className="font-headline text-accent text-center">
            Connect With Me :]
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.url)}
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-lg
                    bg-black/20 border border-accent/30
                    hover:bg-accent/10 hover:border-accent/60
                    transition-all duration-200 group
                    ${social.color}
                  `}
                >
                  <Icon className="w-6 h-6 text-foreground/60 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-xs font-medium text-foreground/60 group-hover:text-foreground/80">
                    {social.name}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
