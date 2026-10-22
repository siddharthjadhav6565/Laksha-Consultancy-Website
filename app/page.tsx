"use client";

import React, { useEffect, useState} from "react";
import {
  motion,
  useScroll,
  AnimatePresence
} from "framer-motion";


import { CustomCursor } from "@/components/ui/cursor";
import { MagneticWrapper } from "@/components/ui/interactions";
import { HeroSection, CapabilitiesGridSection, ProcessSection, SystemArchitectureSection, ContactSection, LogoTicker } from "@/components/home/all";

/* ─────────────────────────────────────────────────────────────
   MASTER PAGE WITH THEME ENGINE & MOBILE MENU
───────────────────────────────────────────────────────────── */
export default function EditorialTechConsultancyPage() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={isDark ? "dark-theme" : "light-theme"}>
      <main className="min-h-screen relative selection:bg-[#FF3E00] selection:text-white theme-bg-base theme-text-primary transition-colors duration-500 overflow-x-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Syne:wght@400;600;700;800&display=swap');
          
          :root {
            --bg-base: #F4F4F0;
            --bg-panel: #FFFFFF;
            --text-primary: #111111;
            --text-muted: #666666;
            --border: rgba(17, 17, 17, 0.1);
          }
          .dark-theme {
            --bg-base: #0A0A0A;
            --bg-panel: #151515;
            --text-primary: #F4F4F0;
            --text-muted: #999999;
            --border: rgba(255, 255, 255, 0.1);
          }
          
          .theme-bg-base { background-color: var(--bg-base); }
          .theme-bg-panel { background-color: var(--bg-panel); }
          .theme-text-primary { color: var(--text-primary); }
          .theme-text-muted { color: var(--text-muted); }
          .theme-border { border-color: var(--border); }
          
          .font-display { font-family: 'Syne', sans-serif; }
          .font-sans    { font-family: 'Outfit', sans-serif; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: var(--bg-base); }
          ::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #FF3E00; }
          
          @keyframes scrollX { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }
          .animate-scrollX-slow { animation: scrollX 40s linear infinite; }
          
          .film-grain {
            position: fixed; top:0; left:0; width:100vw; height:100vh; pointer-events: none; z-index: 9999; opacity: 0.04;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          }
        `}} />

        <div className="film-grain" />
        <CustomCursor />

        {/* Scroll Progress Line */}
        <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 h-[2px] bg-[#FF3E00] w-full origin-left z-[100]" />

        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="fixed inset-0 z-[99999] theme-bg-base flex flex-col items-center justify-center">
              <motion.div initial={{ width: 0 }} animate={{ width: 240 }} transition={{ duration: 1, ease: "easeOut" }} className="h-[2px] bg-[#FF3E00] mb-6" />
              <span className="font-sans text-[10px] tracking-[0.4em] theme-text-primary uppercase font-semibold">Loading Framework</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 lg:px-16 py-4 flex justify-between items-center transition-all bg-[var(--bg-base)]/70 backdrop-blur-xl border-b theme-border theme-text-primary">
          <div className="text-xl font-display font-bold tracking-tight" data-cursor="pointer">Laksha.</div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.15em] font-medium">
            <a data-cursor="pointer" href="#capabilities" className="hover:text-[#FF3E00] transition-colors">Capabilities</a>
            <a data-cursor="pointer" href="#process" className="hover:text-[#FF3E00] transition-colors">Process</a>
            
            <button data-cursor="pointer" onClick={toggleTheme} className="w-8 h-8 rounded-full border theme-border flex items-center justify-center hover:bg-[#111111] hover:text-[#F4F4F0] dark:hover:bg-[#F4F4F0] dark:hover:text-[#111111] transition-colors" aria-label="Toggle Theme">
              {isDark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            <MagneticWrapper strength={0.15}>
              <a data-cursor="pointer" href="#contact" className="px-6 py-2.5 bg-[#111111] dark:bg-[#F4F4F0] text-white dark:text-[#111111] rounded-full hover:bg-[#FF3E00] dark:hover:bg-[#FF3E00] dark:hover:text-white transition-colors">
                Engage
              </a>
            </MagneticWrapper>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleTheme} className="p-2">
               {isDark ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 flex flex-col gap-1.5 z-[60]">
              <span className={`block w-6 h-px theme-bg-primary bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-6 h-px theme-bg-primary bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px theme-bg-primary bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </header>

        {/* Fullscreen Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-[55] theme-bg-base flex flex-col items-center justify-center gap-8 px-5">
              <a href="#capabilities" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold theme-text-primary hover:text-[#FF3E00]">Capabilities</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold theme-text-primary hover:text-[#FF3E00]">Process</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold theme-text-primary hover:text-[#FF3E00]">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && (
          <>
            <HeroSection />
            <LogoTicker />
            <CapabilitiesGridSection />
            <ProcessSection />
            <SystemArchitectureSection />
            <ContactSection />
          </>
        )}

        <footer className="bg-[#111111] text-[#666666] py-12 px-5 md:px-10 lg:px-16 border-t border-[#333333]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-display font-bold text-xl text-white tracking-tighter">LAKSHA.</div>
            <div className="text-[10px] md:text-xs font-sans tracking-widest uppercase text-center md:text-left">
              © {new Date().getFullYear()} LakshaSoft. All Rights Reserved.
            </div>
            <div className="flex gap-6 text-[10px] md:text-xs font-sans tracking-widest uppercase">
              <a href="#" className="hover:text-[#FF3E00] transition-colors" data-cursor="pointer">LinkedIn</a>
              <a href="#" className="hover:text-[#FF3E00] transition-colors" data-cursor="pointer">GitHub</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}