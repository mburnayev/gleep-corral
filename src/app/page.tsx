import { SlotMachine } from '@/components/slot-machine';
import { LeftPanel } from '@/components/left-panel';
import { RightPanel } from '@/components/right-panel';

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background p-4 sm:p-8 overflow-hidden items-center">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-80 lg:flex-shrink-0 lg:items-center lg:justify-center">
        <LeftPanel />
      </div>
      
      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0">
        <div className="text-center mb-8 z-10">
          <h6 className="font-headline text-4xl font-bold text-accent/90" style={{ textShadow: '0 0 15px hsl(var(--accent) / 0.5)' }}>
            Spin to build your army...
          </h6>
        </div>
        <SlotMachine />
      </div>
      
      {/* Right Panel */}
      <div className="hidden lg:flex lg:w-80 lg:flex-shrink-0 lg:items-center lg:justify-center">
        <RightPanel />
      </div>
    </main>
  );
}
