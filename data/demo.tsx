/* ─────────────────────────────────────────────────────────────
   1. DATA SETS
───────────────────────────────────────────────────────────── */
const CAPABILITIES = [
  { id: "01", title: "Custom Software Engineering", category: "Development", desc: "We build resilient, scalable applications tailored to complex operational bottlenecks. From legacy modernization to bespoke enterprise tools, our code is engineered for zero-downtime environments.", stack: ["React", "Node.js", "Python", "PostgreSQL"] },
  { id: "02", title: "SaaS Platform Architecture", category: "Product Build", desc: "Taking your product from concept to a production-ready, multi-tenant environment. We implement sophisticated user management, subscription billing, and cloud-native auto-scaling infrastructure.", stack: ["Next.js", "AWS", "Stripe API", "Redis"] },
  { id: "03", title: "Corporate Web Experiences", category: "Digital Presence", desc: "Moving beyond templates to engineer lightning-fast, highly accessible, brand-defining web platforms. We combine headless architecture with immersive, conversion-optimized interfaces.", stack: ["Headless CMS", "Framer Motion", "WebGL", "Vercel"] },
  { id: "04", title: "Acquisition & Marketing", category: "Growth Systems", desc: "Software requires users. We deploy aggressive, data-backed programmatic advertising and SEO frameworks that capture market share and drive high-intent traffic to your newly built platforms.", stack: ["Meta Ads", "Google Ads", "Programmatic", "Technical SEO"] },
];

const PROCESS_STEPS = [
  { num: "I", title: "Discovery", desc: "We dissect your operational constraints, competitive landscape, and growth objectives in a structured 2-hour technical brief." },
  { num: "II", title: "Architecture", desc: "Our engineers draft a system blueprint — stack decisions, infrastructure plan, and delivery timeline — reviewed with you before a single line of code is written." },
  { num: "III", title: "Build & Deploy", desc: "Parallel development sprints with continuous staging previews. Zero-surprise deployments to production-grade cloud environments." },
  { num: "IV", title: "Growth Activation", desc: "Post-launch, our growth team fires performance acquisition campaigns calibrated to your ICP — turning new software into immediate revenue." },
];

const LOGOS = ["Vercel", "Stripe", "AWS", "Supabase", "Figma", "Datadog", "HubSpot", "Cloudflare"];
  
export { CAPABILITIES, PROCESS_STEPS, LOGOS };