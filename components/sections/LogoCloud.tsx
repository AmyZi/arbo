'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';

const logos = [
  'Northwind',
  'Loop',
  'Fjord',
  'Apex',
  'Vanta',
  'Mercury',
  'Cobalt',
  'Quill',
];

export function LogoCloud() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium text-muted-foreground">
            Powering GenAI at teams from startup to scale
          </p>
        </Reveal>
        <div className="mt-6 overflow-hidden mask-fade-edges">
          <motion.div
            className="flex w-max gap-12"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            {[...logos, ...logos].map((name, i) => (
              <span
                key={i}
                className="font-display text-xl font-bold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
