'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Slide = {
  title: string;
  description: string;
  image: string;
  imageHint: string;
  icon: React.ReactNode;
};

type PortalHeroSliderProps = {
  slides: Slide[];
};

const DURATION = 5000; // 5 seconds autoplay

export function PortalHeroSlider({ slides }: PortalHeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, DURATION);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const activeSlide = slides[activeIndex];

  const variants = {
    enter: {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0,
    },
    center: {
      clipPath: 'circle(150% at 50% 50%)',
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <section
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={activeSlide.image}
            alt={activeSlide.title}
            data-ai-hint={activeSlide.imageHint}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="flex flex-col items-center"
            >
                <div className="mb-4 text-primary">{activeSlide.icon}</div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-300">
                    {activeSlide.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-slate-300">
                    {activeSlide.description}
                </p>
                <Button asChild variant="outline" className="mt-8 bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white">
                    <Link href="#projects">
                        View Project
                    </Link>
                </Button>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute z-20 bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="rounded-full bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20"
          aria-label="Previous Slide"
        >
          <ArrowLeft />
        </Button>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'h-2 w-2 rounded-full transition-all duration-300',
              activeIndex === i ? 'w-6 bg-primary' : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20"
          aria-label="Next Slide"
        >
          <ArrowRight />
        </Button>
      </div>

       {/* Pause/Play Button */}
        <div className="absolute top-6 right-6 z-20">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPaused(!isPaused)}
                className="rounded-full bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20"
                aria-label={isPaused ? 'Play slider' : 'Pause slider'}
            >
                {isPaused ? <Play /> : <Pause />}
            </Button>
        </div>
    </section>
  );
}
