import { SlotMachine } from '@/components/slot-machine';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 overflow-hidden">
      <div className="text-center mb-8 z-10">
        <h6 className="font-headline text-4xl font-bold text-accent/90" style={{ textShadow: '0 0 15px hsl(var(--accent) / 0.5)' }}>
          Spin to build your army...
        </h6>
      </div>
      <SlotMachine />
    </main>
  );
}
