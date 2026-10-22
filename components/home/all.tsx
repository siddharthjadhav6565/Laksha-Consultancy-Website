import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MagneticWrapper, RevealText, FadeInSection } from "@/components/ui/interactions";
import { CAPABILITIES, PROCESS_STEPS, LOGOS } from "@/data/demo";

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
              We abandon standard monolithic constraints, deploying distributed, event-driven architectures that scale infinitely while maintaining steady performance.
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesGridSection />
      <ProcessSection />
      <SystemArchitectureSection />
      <ContactSection />
      <LogoTicker />
    </>
  );
}

export { HeroSection, CapabilitiesGridSection, ProcessSection, SystemArchitectureSection, ContactSection, LogoTicker };