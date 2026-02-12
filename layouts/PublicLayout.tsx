import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../ui/navigation/Header';
import { Footer } from '../ui/navigation/Footer';
import { BottomNav } from '../ui/navigation/BottomNav';
import { FloatingSupport } from '../ui/marketing/FloatingSupportButton';
import { PopupBanner } from '../ui/marketing/PopupBanner';

export const PublicLayout: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const maxHeightRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    // Check if popup has already been shown in this session
    const hasShown = sessionStorage.getItem('hasShownPopup');
    
    if (!hasShown) {
      // Show immediately without delay
      setShowPopup(true);
      sessionStorage.setItem('hasShownPopup', 'true');
    }
  }, []);

  useEffect(() => {
    // Initialize max height
    if (typeof window !== 'undefined') {
      maxHeightRef.current = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    }

    const handleResize = () => {
      const currentHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      
      // Update max height if current is larger (e.g. address bar collapsed)
      if (currentHeight > maxHeightRef.current) {
        maxHeightRef.current = currentHeight;
      }

      // Only apply logic on mobile screens (width < 768px)
      if (window.innerWidth < 768) {
        // If height decreases significantly (>20%), assume keyboard is open
        // Keyboards typically take 30-40% of screen height
        if (currentHeight < maxHeightRef.current * 0.8) {
          setIsKeyboardOpen(true);
        } else {
          setIsKeyboardOpen(false);
        }
      } else {
        setIsKeyboardOpen(false);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {showPopup && <PopupBanner onClose={() => setShowPopup(false)} />}
      <Header />
      <main className="flex-grow bg-slate-50 pb-16 md:pb-0">
        <div key={location.pathname} className="animate-fade-in">
           <Outlet />
        </div>
      </main>
      <Footer />
      
      {/* Hide bottom floating elements when keyboard is open on mobile to prevent obstruction.
          Instant visibility toggle without transition as requested.
      */}
      <div className={isKeyboardOpen ? 'hidden' : 'block'}>
        <BottomNav />
        <FloatingSupport />
      </div>
    </div>
  );
};