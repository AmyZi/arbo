import type { ReactNode } from 'react';

export function PageBackground({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-mesh-warm" />
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}