import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-0 bg-mesh-warm" />
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
      <div className="relative">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-warm text-white shadow-lg shadow-orange-500/30">
          <Sparkles className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-6xl font-extrabold tracking-tighter text-foreground">
          404
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          This page wandered off the workflow.
        </p>
        <Button asChild className="mt-8 bg-gradient-warm text-white shadow-lg shadow-orange-500/25">
          <Link href="/">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back home
          </Link>
        </Button>
      </div>
    </div>
  );
}
