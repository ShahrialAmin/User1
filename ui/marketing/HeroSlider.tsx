import React, { useState, useEffect, useRef, useMemo, useCallback, memo, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Memoized slide component for better performance
const Slide = memo<{
  slide: any;
  index: number;
  count: number;
  onNavigate: (link: string) => void;
}>(({ slide, index, count, onNavigate }) => {
  const handleClick = useCallback(() => {
    onNavigate(slide.link);
  }, [onNavigate, slide.link]);

  return (
    <div 
      className="h-full relative"
      style={{ width: `${100 / count}%` }}
    >
      <div className="relative w-full h-full flex items-end overflow-hidden select-none">
        {/* Background Image with WebP support */}
        <picture>
          <source 
            srcSet={`${slide.image}&fm=webp&w=1920`}
            type="image/webp"
          />
          <div 
            className="absolute inset-0 bg-cover bg-[center_top] z-0"
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              willChange: 'transform'
            }}
          />
        </picture>
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${slide.gradient} opacity-90 z-10 pointer-events-none`} />
        
        {/* Content */}
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 h-full flex items-end relative z-20 pb-6 sm:pb-10 md:pb-12 pointer-events-none">
          <div className="w-full md:w-3/4 lg:w-1/2 text-left pointer-events-auto">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 leading-[0.9] tracking-tighter drop-shadow-xl">
              {slide.title}
            </h2>
            <button 
              onClick={handleClick}
              className={`${slide.buttonClass} text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2 border border-white/10 hover:scale-105`}
              aria-label={slide.buttonText}
            >
              {slide.buttonText} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

Slide.displayName = 'Slide';

export const HeroSlider = memo(() => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const startXRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Memoize static data
  const slidesData = useMemo(() => [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1920&auto=format&fit=crop',
      title: <>GET 100% <br/><span className="text-[#dc2625]">BONUS</span> TOPUP</>,
      buttonText: 'Top Up Now',
      buttonClass: 'bg-[#dc2625] hover:bg-[#b91c1c] shadow-red-900/30',
      gradient: 'from-black via-black/40 to-transparent',
      link: '/store/product/100-bonus'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop',
      title: <>PUBG MOBILE <br/><span className="text-cyan-400">ROYAL PASS</span></>,
      buttonText: 'Buy UC Now',
      buttonClass: 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/30',
      gradient: 'from-indigo-950 via-indigo-900/40 to-transparent',
      link: '/store/product/pubg'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=1920&auto=format&fit=crop',
      title: <>WEEKLY <br/><span className="text-emerald-400">MEMBERSHIP</span></>,
      buttonText: 'Check Offers',
      buttonClass: 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30',
      gradient: 'from-emerald-950 via-emerald-900/40 to-transparent',
      link: '/store/product/ff-weekly-bd'
    }
  ], []);

  const count = slidesData.length;

  // Cleanup function for intervals and RAF
  const cleanup = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Start autoplay
  const startAutoplay = useCallback(() => {
    cleanup();
    intervalRef.current = window.setInterval(() => {
      setCurrent(prev => (prev + 1) % count);
    }, 5000);
  }, [count, cleanup]);

  // Stop autoplay
  const stopAutoplay = useCallback(() => {
    cleanup();
  }, [cleanup]);

  // Autoplay setup with cleanup
  useEffect(() => {
    startAutoplay();
    return () => cleanup();
  }, [startAutoplay, cleanup]);

  // Memoized navigation handlers
  const handleNext = useCallback(() => {
    stopAutoplay();
    setCurrent(prev => (prev + 1) % count);
    startAutoplay();
  }, [count, stopAutoplay, startAutoplay]);
  
  const handlePrev = useCallback(() => {
    stopAutoplay();
    setCurrent(prev => (prev - 1 + count) % count);
    startAutoplay();
  }, [count, stopAutoplay, startAutoplay]);

  const handleDotClick = useCallback((idx: number) => {
    setCurrent(idx);
    stopAutoplay();
    startAutoplay();
  }, [stopAutoplay, startAutoplay]);

  // Touch handlers with RAF for smooth dragging
  const handleTouchStart = useCallback((e: TouchEvent) => {
    stopAutoplay();
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  }, [stopAutoplay]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || startXRef.current === null) return;
    
    // Use RAF for smooth updates
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      const currentX = e.touches[0].clientX;
      const diff = currentX - startXRef.current!;
      setDragOffset(diff);
    });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        setCurrent(prev => (prev - 1 + count) % count);
      } else {
        setCurrent(prev => (prev + 1) % count);
      }
    }
    
    setDragOffset(0);
    startXRef.current = null;
    startAutoplay();
  }, [isDragging, dragOffset, count, startAutoplay]);

  // Memoized navigate handler
  const handleNavigate = useCallback((link: string) => {
    navigate(link);
  }, [navigate]);

  return (
    <div className="w-full mb-6 relative z-0">
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden touch-pan-y group rounded-2xl shadow-xl border border-white/20 ring-1 ring-black/5 bg-slate-900 h-[200px] xs:h-[240px] sm:h-[300px] md:h-auto md:aspect-[2.75/1]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div 
          className="h-full flex"
          style={{ 
            width: `${count * 100}%`,
            transform: `translateX(calc(-${(current * 100) / count}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            willChange: isDragging ? 'transform' : 'auto'
          }}
        >
          {slidesData.map((slide, idx) => (
            <Slide 
              key={slide.id}
              slide={slide}
              index={idx}
              count={count}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            handlePrev(); 
          }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 backdrop-blur-md text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center border border-white/20 active:scale-95 hover:scale-110 shadow-lg z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            handleNext(); 
          }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 backdrop-blur-md text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center border border-white/20 active:scale-95 hover:scale-110 shadow-lg z-30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 mt-3" role="tablist" aria-label="Slide navigation">
        {slidesData.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              current === idx 
                ? 'bg-[#dc2625] w-6 shadow-sm shadow-red-200' 
                : 'bg-slate-300 w-1.5 hover:bg-slate-400'
            }`}
            role="tab"
            aria-selected={current === idx}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

HeroSlider.displayName = 'HeroSlider';
