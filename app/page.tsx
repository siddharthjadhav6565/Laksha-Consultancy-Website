"use client";

import React, { useEffect, useState, useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useInView,
  useMotionValue,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   1. DATA SETS
───────────────────────────────────────────────────────────── */
const CAPABILITIES = [
  { id: "01", title: "Custom Software Engineering", category: "Development", desc: "We build resilient, scalable applications tailored to complex operational bottlenecks. From legacy modernization to bespoke enterprise tools, our code is engineered for zero-downtime environments.", stack: ["React", "Node.js", "Python", "PostgreSQL"] },
  { id: "02", title: "SaaS Platform Architecture", category: "Product Build", desc: "Taking your product from concept to a production-ready, multi-tenant environment. We implement sophisticated user management, subscription billing, and cloud-native auto-scaling infrastructure.", stack: ["Next.js", "AWS", "Stripe API", "Redis"] },
  { id: "03", title: "Corporate Web Experiences", category: "Digital Presence", desc: "Moving beyond templates to engineer lightning-fast, highly accessible, brand-defining web platforms. We combine headless architecture with immersive, conversion-optimized interfaces.", stack: ["Headless CMS", "Framer Motion", "WebGL", "Vercel"] },
  { id: "04", title: "Acquisition & Marketing", category: "Growth Systems", desc: "Software requires users. We deploy aggressive, data-backed programmatic advertising and SEO frameworks that capture market share and drive high-intent traffic to your newly built platforms.", stack: ["Meta Ads", "Google Ads", "Programmatic", "Technical SEO"] },
];

const STATS = [
  { value: "48", unit: "hr", label: "Average Project Kickoff" },
  { value: "200", unit: "+", label: "Platforms Shipped" },
  { value: "98", unit: "%", label: "Client Retention Rate" },
  { value: "12", unit: "x", label: "Average ROI on Ad Spend" },
];

const PROCESS_STEPS = [
  { num: "I", title: "Discovery", desc: "We dissect your operational constraints, competitive landscape, and growth objectives in a structured 2-hour technical brief." },
  { num: "II", title: "Architecture", desc: "Our engineers draft a system blueprint — stack decisions, infrastructure plan, and delivery timeline — reviewed with you before a single line of code is written." },
  { num: "III", title: "Build & Deploy", desc: "Parallel development sprints with continuous staging previews. Zero-surprise deployments to production-grade cloud environments." },
  { num: "IV", title: "Growth Activation", desc: "Post-launch, our growth team fires performance acquisition campaigns calibrated to your ICP — turning new software into immediate revenue." },
];

const LOGOS = ["Vercel", "Stripe", "AWS", "Supabase", "Figma", "Datadog", "HubSpot", "Cloudflare"];
  
/* ─────────────────────────────────────────────────────────────
   2. NEXT-LEVEL MICRO-INTERACTIONS & COMPONENTS
───────────────────────────────────────────────────────────── */

// Magnetic Pull wrapper for premium button feels
function MagneticWrapper({ children, strength = 0.3 }: { children: ReactNode, strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

// Masked text reveal for high-end typography
function RevealText({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeInSection({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. NEO-OS CUSTOM CURSOR
───────────────────────────────────────────────────────────── */
type CursorState = "default" | "pointer" | "text";

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorState, setCursorState] = useState<CursorState>("default");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      const isPointer = ['a', 'button', 'select'].includes(tagName) || target.closest('a, button, [data-cursor="pointer"]');
      const isText = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'input', 'textarea', 'label'].includes(tagName);

      if (isPointer) setCursorState("pointer");
      else if (isText) setCursorState("text");
      else setCursorState("default");
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => { window.removeEventListener("mousemove", moveCursor); window.removeEventListener("mouseover", handleMouseOver); };
  }, [cursorX, cursorY]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
      <motion.div style={{ x: cursorX, y: cursorY }} className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform hidden md:block">
        <AnimatePresence mode="wait">
          {cursorState === "default" && (
            <motion.svg key="default" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} width="24" height="24" viewBox="0 0 24 24" className="theme-text-primary drop-shadow-md origin-top-left">
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.94c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" fill="currentColor" stroke="var(--bg-base)" strokeWidth="1.5" strokeLinejoin="round"/>
            </motion.svg>
          )}
          {cursorState === "pointer" && (
            <motion.svg key="pointer" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1.1 }} exit={{ opacity: 0, scale: 0.8 }} width="24" height="24" viewBox="0 0 24 24" className="text-[#FF3E00] drop-shadow-lg origin-top-left">
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.94c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" fill="currentColor" stroke="var(--bg-base)" strokeWidth="1.5" strokeLinejoin="round"/>
            </motion.svg>
          )}
          {cursorState === "text" && (
            <motion.div key="text" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} className="w-[2px] h-6 bg-[#FF3E00] -translate-x-1/2 -translate-y-1/2 shadow-sm rounded-full" />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. SECTIONS
───────────────────────────────────────────────────────────── */
function LogoTicker() {
  const repeated = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div className="py-8 md:py-10 border-y theme-border overflow-hidden theme-bg-panel relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg-panel), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg-panel), transparent)" }} />
      <div className="flex items-center gap-12 md:gap-16 whitespace-nowrap w-max animate-scrollX-slow will-change-transform">
        {repeated.map((name, i) => (
          <div key={i} className="flex items-center gap-3 md:gap-4">
            <span className="font-display font-bold text-sm md:text-base theme-text-primary opacity-30 tracking-tight uppercase">{name}</span>
            <span className="w-1 h-1 rounded-full theme-bg-primary opacity-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-[100svh] px-5 md:px-10 lg:px-16 pt-32 pb-20 flex flex-col justify-center overflow-hidden theme-bg-base">
      <motion.div style={{ y: yParallax, opacity, willChange: "transform, opacity" }} className="max-w-6xl relative z-10">
        
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border theme-border theme-bg-panel shadow-sm mb-10 mt-8">
          <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
          <span className="text-[10px] font-sans uppercase tracking-[0.15em] font-semibold theme-text-primary">Accepting New Engagements</span>
        </motion.div>

        <h1 className="text-[clamp(3.2rem,8vw,8rem)] font-display font-bold leading-[0.9] tracking-tighter theme-text-primary mb-8">
          <RevealText>We Build</RevealText> <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--text-primary)" }}><RevealText>Tech.</RevealText></span><br />
          <RevealText>We Grow</RevealText>{" "}
          <span className="relative inline-block">
            <RevealText>Markets.</RevealText>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 1 }} className="absolute bottom-1 md:-bottom-2 left-0 w-full h-[4px] md:h-[6px] bg-[#FF3E00] origin-left" />
          </span>
        </h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="grid md:grid-cols-2 gap-8 md:gap-10 mt-12 md:mt-16">
          <p className="text-base md:text-xl font-sans font-light leading-relaxed theme-text-muted max-w-md">
            A unified technology partner for modern enterprises. From multi-tenant SaaS architecture to aggressive customer acquisition systems, we engineer predictable revenue.
          </p>
          <div className="flex items-start gap-4 md:justify-end">
            <MagneticWrapper>
              <button data-cursor="pointer" onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 rounded-full border theme-border font-sans font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-2 theme-text-primary bg-transparent hover:theme-bg-panel hover:shadow-lg">
                View Capabilities
              </button>
            </MagneticWrapper>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20" style={{
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
      }} />
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-[#111111] py-20 md:py-24 px-5 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <FadeInSection key={i} delay={i * 0.1}>
            <motion.div data-cursor="pointer" whileHover={{ y: -4, backgroundColor: "#1A1A1A" }} className="flex flex-col items-start p-8 md:p-10 rounded-2xl bg-[#151515] border border-[#333333] transition-colors h-full">
              <div className="flex items-end gap-1 mb-4">
                <span className="font-display font-bold text-4xl lg:text-5xl leading-none text-white tracking-tight">{stat.value}</span>
                <span className="font-display font-bold text-xl text-[#FF3E00] mb-1">{stat.unit}</span>
              </div>
              <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#888888]">{stat.label}</span>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}

function CapabilitiesGridSection() {
  return (
    <section id="capabilities" className="py-24 md:py-32 px-5 md:px-10 lg:px-16 theme-bg-base relative z-10 border-t theme-border">
      <div className="max-w-7xl mx-auto">
        <FadeInSection className="mb-16 md:mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b theme-border pb-12 md:pb-16">
          <div>
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#FF3E00] mb-4">// Core Competencies</div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold theme-text-primary leading-none tracking-tight">
              <RevealText>Architecting</RevealText> <br /> <RevealText>Scale.</RevealText>
            </h2>
          </div>
          <p className="max-w-md font-sans theme-text-muted leading-relaxed text-base md:text-lg">
            Siloed agencies build disjointed products. We bring engineering, web architecture, and aggressive growth under one cohesive roof.
          </p>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap, idx) => (
            <FadeInSection key={cap.id} delay={idx * 0.08} className="relative group theme-bg-panel p-8 md:p-12 rounded-3xl border theme-border shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden" data-cursor="pointer">
              <div className="absolute -top-4 -right-4 text-[100px] md:text-[140px] font-display font-bold theme-text-primary opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none z-0 transition-all duration-500 group-hover:text-[#FF3E00] group-hover:opacity-10 group-hover:scale-110">
                {cap.id}
              </div>
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 theme-bg-base border theme-border rounded-full text-[10px] font-sans font-semibold theme-text-primary uppercase tracking-[0.15em] mb-6 md:mb-8">
                  {cap.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold theme-text-primary mb-4 tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-sm md:text-base font-sans theme-text-muted leading-relaxed mb-8 md:mb-10">
                  {cap.desc}
                </p>
                <div>
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-widest theme-text-primary mb-4">Technology Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {cap.stack.map((tech, j) => (
                      <span key={j} className="px-4 py-2 border theme-border text-xs font-sans theme-text-muted rounded-lg theme-bg-base transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 px-5 md:px-10 lg:px-16 theme-bg-panel border-t theme-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeInSection className="mb-16 md:mb-20">
          <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#FF3E00] mb-4">// How We Operate</div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold theme-text-primary leading-none tracking-tight">
            <RevealText>The </RevealText><span className="text-transparent" style={{ WebkitTextStroke: "1px var(--text-primary)" }}><RevealText>Engagement</RevealText></span><br />
            <RevealText>Protocol.</RevealText>
          </h2>
        </FadeInSection>

        <div className="relative">
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px theme-bg-primary opacity-10 hidden md:block" />
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <FadeInSection key={i} delay={i * 0.12}>
                <motion.div data-cursor="pointer" whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="group relative flex flex-col md:flex-row gap-6 md:gap-16 items-start py-10 md:py-12 px-6 -mx-6 rounded-2xl border-b theme-border hover:theme-bg-base transition-colors">
                  <div className="flex-shrink-0 flex items-center gap-3 md:w-18">
                    <div className="w-9 h-9 rounded-full border theme-border flex items-center justify-center theme-bg-panel group-hover:bg-[#111111] dark:group-hover:bg-[#F4F4F0] transition-colors duration-300 relative z-10 shadow-sm">
                      <span className="font-display font-bold text-[10px] theme-text-primary group-hover:text-white dark:group-hover:text-[#111111] transition-colors duration-300 tracking-wider">{step.num}</span>
                    </div>
                  </div>
                  <div className="flex-1 grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
                    <h3 className="text-2xl md:text-4xl font-display font-bold theme-text-primary tracking-tight group-hover:text-[#FF3E00] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="font-sans theme-text-muted leading-relaxed text-sm md:text-base lg:max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ARCH_PILLARS = [
  { id: "01", title: "Frontend", desc: "Kinetic interfaces that defy generic templates.", tech: "React / WebGL" },
  { id: "02", title: "Backend", desc: "Resilient logic layers built for hyperscale.", tech: "Node / Python" },
  { id: "03", title: "Data", desc: "Distributed persistence with zero-latency.", tech: "Postgres / Redis" },
  { id: "04", title: "Cloud", desc: "Auto-scaling infrastructure deployed flawlessly.", tech: "AWS / Vercel" },
];

function SystemArchitectureSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2]);

  return (
    <section ref={targetRef} className="py-24 md:py-40 px-5 md:px-10 lg:px-16 bg-[#111111] text-[#F4F4F0] relative overflow-hidden">
      <motion.div style={{ scale, opacity, willChange: "transform, opacity" }} className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#FF3E00] mb-6">// Infrastructure</div>
            <h2 className="text-[clamp(3rem,6vw,7rem)] font-display font-bold leading-[0.85] tracking-tighter mb-8 z-20 relative text-[#F4F4F0]">
              System <br/>
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #F4F4F0" }}>Topology.</span>
            </h2>
            <p className="text-[#999999] font-sans text-base md:text-lg max-w-md leading-relaxed">
              We abandon standard monolithic constraints, deploying distributed, event-driven architectures that scale infinitely while maintaining brutalist aesthetic precision.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {ARCH_PILLARS.map((pillar) => (
              <motion.div key={pillar.id} whileHover={{ x: -8, backgroundColor: "#1A1A1A", borderColor: "#FF3E00" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="group p-6 border border-[#333333] transition-colors duration-300 rounded-xl relative overflow-hidden bg-[#151515]" data-cursor="pointer">
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <span className="font-display font-bold text-xl text-[#F4F4F0] tracking-tight">{pillar.title}</span>
                  <span className="font-mono text-xs text-[#FF3E00]">{pillar.id}</span>
                </div>
                <p className="font-sans text-sm text-[#999999] mb-4 relative z-10">{pillar.desc}</p>
                <div className="text-[10px] font-sans uppercase tracking-widest text-[#666666] group-hover:text-[#F4F4F0] transition-colors relative z-10">
                  {pillar.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] pointer-events-none z-0 opacity-10 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }} style={{ willChange: "transform" }} className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full border border-dashed border-[#F4F4F0]" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 240, repeat: Infinity, ease: "linear" }} style={{ willChange: "transform" }} className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full border border-[#FF3E00]" />
      </div>
    </section>
  );
}

function ContactSection() {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      name: (form.querySelector("#name") as HTMLInputElement)?.value || "",
      email: (form.querySelector("#email") as HTMLInputElement)?.value || "",
      budget: (form.querySelector("#budget") as HTMLSelectElement)?.value || "",
      details: (form.querySelector("#details") as HTMLTextAreaElement)?.value || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      form.reset();
      setSuccessOpen(true);
    } catch (err) {
      console.error(err);
      setErrorOpen(true);
    }
  };

  return (
    <section id="contact" className="relative px-5 md:px-10 lg:px-16 py-24 md:py-32 theme-bg-panel">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20">
        <FadeInSection>
          <h2 className="text-[clamp(3rem,5vw,5rem)] font-display font-bold leading-[0.9] theme-text-primary mb-6 tracking-tight">
            <RevealText>Start the</RevealText> <br /> <span className="text-[#FF3E00]"><RevealText>Dialogue.</RevealText></span>
          </h2>
          <p className="text-base md:text-lg font-sans theme-text-muted max-w-md mb-12">Submit your project constraints. Our technical directors review all inquiries within 24 hours to determine operational fit.</p>
          <div className="space-y-6 md:space-y-8 font-sans text-sm">
            <div className="flex flex-col md:flex-row md:items-center border-t theme-border pt-6 hover:text-[#FF3E00] transition-colors" data-cursor="pointer">
              <span className="w-40 uppercase tracking-widest theme-text-muted font-semibold text-[10px] mb-2 md:mb-0">Email Link</span>
              <span className="theme-text-primary font-medium text-sm md:text-base">siddharthjadhav@laksha.in</span>
            </div>
            <div className="flex flex-col md:flex-row border-t theme-border pt-6">
              <span className="w-40 uppercase tracking-widest theme-text-muted font-semibold text-[10px] mb-2 md:mb-0">Headquarters</span>
              <span className="theme-text-primary font-medium text-sm md:text-base leading-relaxed">Mumbai, Maharashtra<br />Global Remote Operations</span>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.15}>
          <form onSubmit={handleSubmit} className="theme-bg-base p-6 md:p-12 border theme-border rounded-3xl shadow-sm">
            <div className="space-y-6 md:space-y-8">
              <div className="relative">
                <input type="text" id="name" required className="w-full bg-transparent border-b theme-border py-3 theme-text-primary font-sans outline-none focus:border-[#FF3E00] peer transition-colors placeholder-transparent" placeholder=" " />
                <label htmlFor="name" className="absolute left-0 top-3 text-sm font-sans theme-text-muted transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#FF3E00] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">
                  Full Name / Organization
                </label>
              </div>
              <div className="relative">
                <input type="email" id="email" required className="w-full bg-transparent border-b theme-border py-3 theme-text-primary font-sans outline-none focus:border-[#FF3E00] peer transition-colors placeholder-transparent" placeholder=" " />
                <label htmlFor="email" className="absolute left-0 top-3 text-sm font-sans theme-text-muted transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#FF3E00] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">
                  Direct Email
                </label>
              </div>
              <div className="relative">
                <select id="budget" defaultValue="" className="w-full bg-transparent border-b theme-border py-3 theme-text-muted font-sans outline-none focus:border-[#FF3E00] transition-colors appearance-none" data-cursor="pointer">
                  <option value="" disabled>Approximate Budget Range</option>
                  <option>Under ₹5L</option>
                  <option>₹5L – ₹20L</option>
                  <option>₹20L – ₹50L</option>
                  <option>₹50L+</option>
                </select>
                <svg className="absolute right-2 top-4 theme-text-muted pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="relative pt-4">
                <textarea id="details" required rows={3} className="w-full bg-transparent border-b theme-border py-3 theme-text-primary font-sans outline-none resize-none focus:border-[#FF3E00] peer transition-colors placeholder-transparent" placeholder=" " />
                <label htmlFor="details" className="absolute left-0 top-3 text-sm font-sans theme-text-muted transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#FF3E00] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">
                  Project Scope & Objectives
                </label>
              </div>
              <MagneticWrapper strength={0.1}>
                <button data-cursor="pointer" type="submit" className="w-full py-4 mt-6 bg-[#111111] dark:bg-[#F4F4F0] text-white dark:text-[#111111] font-sans font-medium text-sm tracking-wide rounded-full hover:bg-[#FF3E00] dark:hover:bg-[#FF3E00] dark:hover:text-white transition-colors duration-300 shadow-md">
                  Submit Request
                </button>
              </MagneticWrapper>
            </div>
          </form>
        </FadeInSection>
        <AnimatePresence>
        {successOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
            onClick={() => setSuccessOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border theme-border theme-bg-panel p-6 md:p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00C853]/10 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#00C853]" />
                </div>
                <div>
                  <div className="text-sm font-sans uppercase tracking-widest text-[#00C853]">
                    Request Sent
                  </div>
                  <div className="text-xs theme-text-muted">
                    Submission received successfully
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm md:text-base font-sans theme-text-primary leading-relaxed mb-6">
                Your project request has been logged. Our team will review the details and get back within 24 hours.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSuccessOpen(false)}
                  className="flex-1 py-3 rounded-full border theme-border text-sm font-sans theme-text-primary hover:bg-[#FF3E00] hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSuccessOpen(false);
                    document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 py-3 rounded-full bg-[#111111] dark:bg-[#F4F4F0] text-white dark:text-[#111111] text-sm font-sans hover:bg-[#FF3E00] transition-colors"
                >
                  Explore More
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
      {errorOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
          onClick={() => setErrorOpen(false)}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border theme-border theme-bg-panel p-6 md:p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FF3E00]/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#FF3E00]" />
              </div>
              <div>
                <div className="text-sm font-sans uppercase tracking-widest text-[#FF3E00]">
                  Transmission Failed
                </div>
                <div className="text-xs theme-text-muted">
                  Unable to process request
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm md:text-base font-sans theme-text-primary leading-relaxed mb-6">
              The request could not be recorded at this moment. This is typically a temporary issue. 
              Please retry, or reach out directly via email if the problem persists.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setErrorOpen(false)}
                className="flex-1 py-3 rounded-full border theme-border text-sm font-sans theme-text-primary hover:bg-[#FF3E00] hover:text-white transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setErrorOpen(false);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 py-3 rounded-full bg-[#111111] dark:bg-[#F4F4F0] text-white dark:text-[#111111] text-sm font-sans hover:bg-[#FF3E00] transition-colors"
              >
                Retry
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   13. MASTER PAGE WITH THEME ENGINE & MOBILE MENU
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
            <StatsSection />
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