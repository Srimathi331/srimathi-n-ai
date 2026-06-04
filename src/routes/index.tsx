import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/srimathi-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Srimathi N — AI Engineer & Software Developer" },
      { name: "description", content: "Portfolio of Srimathi N — AI Engineer & SDE building intelligent, scalable products with Generative AI, Computer Vision, and Full-Stack engineering." },
      { property: "og:title", content: "Srimathi N — AI Engineer & Software Developer" },
      { property: "og:description", content: "Building intelligent systems and scalable software solutions." },
    ],
  }),
  component: Portfolio,
});

/* ─────────── helpers ─────────── */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(scrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-accent/40 animate-float-slow"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────── nav ─────────── */

const NAV = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <a href="#top" className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-foreground font-mono text-xs">SN</span>
          <span className="hidden sm:inline">Srimathi N</span>
        </a>
        <nav
          className={`flex items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-1.5 text-xs backdrop-blur-xl transition-all ${
            scrolled ? "shadow-[0_8px_30px_-15px_rgba(255,255,255,0.15)]" : ""
          }`}
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden items-center gap-1.5 text-sm md:inline-flex"
        >
          <span className="underline-offset-4 hover:underline">Let's talk</span>
          <span className="text-accent">↗</span>
        </a>
      </div>
    </header>
  );
}

/* ─────────── sections ─────────── */

const ROLES = ["AI Engineer", "SDE", "Full-Stack Dev", "GenAI Builder"];

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block h-[1.2em] min-w-[10ch] overflow-hidden align-bottom">
      {ROLES.map((r, idx) => (
        <span
          key={r}
          className="absolute inset-0 transition-all duration-500 text-accent-soft"
          style={{
            transform: `translateY(${(idx - i) * 100}%)`,
            opacity: idx === i ? 1 : 0,
          }}
        >
          {r}
        </span>
      ))}
    </span>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-28">
      {/* Layered backgrounds */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 6%) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 6%) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.04_165_/_18%),transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent-soft/10 blur-[120px]" />
      <Particles />

      {/* Ghost type */}
      <div className="pointer-events-none absolute inset-x-0 top-[55%] -translate-y-1/2 select-none text-center">
        <span className="text-display ghost-text text-[18vw] leading-none">PORTFOLIO</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Status pill */}
        <div className="flex justify-center" data-reveal>
          <div className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs backdrop-blur-xl">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-muted-foreground">Open to</span>
            <RoleRotator />
            <span className="text-muted-foreground">roles · 2026</span>
          </div>
        </div>

        {/* Headline + portrait grid */}
        <div className="mt-10 grid grid-cols-1 items-center gap-12 md:mt-14 md:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-accent">●</span> Srimathi N — Portfolio
            </p>
            <h1 className="mt-5 text-display text-[22vw] leading-[0.85] md:text-[11rem]">
              Hello<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
              It's <span className="text-foreground">Srimathi</span>, an{" "}
              <span className="text-accent-soft">AI Engineer & SDE</span> building intelligent,
              scalable products at the intersection of{" "}
              <span className="text-foreground">Generative AI</span>, Agentic systems, Computer
              Vision & Full-Stack engineering.
            </p>

            {/* CTA cluster */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition hover:bg-accent-soft"
              >
                <span className="relative z-10">View projects</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm transition hover:border-accent hover:bg-secondary/40 hover:text-accent-soft"
              >
                Contact me
              </a>
              <a
                href="#"
                className="group inline-flex items-center gap-1.5 rounded-full px-3 py-3 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <span className="underline-offset-4 group-hover:underline">Résumé</span>
                <span className="text-accent">↓</span>
              </a>
            </div>

            {/* Inline stats */}
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <div className="text-display text-3xl">+<Counter to={15} /></div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">Projects</div>
              </div>
              <div>
                <div className="text-display text-3xl"><Counter to={7} />+</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">AI Domains</div>
              </div>
              <div>
                <div className="text-display text-3xl">7.83</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">CGPA</div>
              </div>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative" data-reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              {/* corner ticks */}
              <span className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-accent" />
              <span className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-accent" />
              <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-accent" />
              <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-accent" />

              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={portrait}
                  alt="Srimathi N portrait"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                {/* scanline accent */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                {/* label */}
                <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                  SRI · 001
                </div>
                <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                  ◐ AI · SDE
                </div>
              </div>

              {/* Floating badge */}
              <div className="glass-card absolute -bottom-5 -left-5 rounded-xl px-4 py-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Now</div>
                <div className="mt-0.5 flex items-center gap-2 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Building GenAI agents
                </div>
              </div>

              {/* Floating tech badge */}
              <div className="glass-card absolute -right-4 top-8 hidden rounded-xl px-3 py-2 md:block">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">Stack</div>
                <div className="mt-1 text-xs">Python · React · LLMs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-16 flex items-center justify-between border-t border-border pt-6 text-xs text-muted-foreground">
          <a href="#about" className="group inline-flex items-center gap-2 hover:text-foreground">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-border transition group-hover:border-accent group-hover:text-accent">↓</span>
            Scroll to explore
          </a>
          <span className="hidden font-mono tracking-widest md:inline">[ AI · SDE · FULL-STACK ]</span>
          <span className="font-mono">2026 © SN</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Generative AI", "LLMs", "RAG", "Agentic AI", "Computer Vision", "MERN", "Python", "System Design", "Data Structures"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-border bg-secondary/30 py-6 overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap text-display text-3xl text-muted-foreground">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ n, title, kicker }: { n: string; title: string; kicker?: string }) {
  return (
    <div className="mb-14 flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between" data-reveal>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">{n}</span>
        <h2 className="text-display text-4xl md:text-6xl">{title}</h2>
      </div>
      {kicker && (
        <p className="max-w-xs font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {kicker}
        </p>
      )}
    </div>
  );
}

function About() {
  const tags = [
    "AI & Data Science Student",
    "AI + SDE Career Path",
    "Generative AI",
    "Full-Stack Developer",
    "Problem Solver",
    "Continuous Learner",
  ];
  const facts = [
    { k: "Based in", v: "Tamil Nadu, India" },
    { k: "Degree", v: "B.Tech AI & DS" },
    { k: "Class of", v: "2028" },
    { k: "Focus", v: "GenAI · Agentic AI" },
  ];
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <SectionLabel n="01 / About" title="A short story." kicker="Profile · Background · Mindset" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* Left — quote card */}
        <div className="md:col-span-4" data-reveal>
          <div className="glass-card relative overflow-hidden rounded-2xl p-6">
            <span className="absolute -right-4 -top-6 text-display text-[8rem] leading-none text-accent/20 select-none">"</span>
            <p className="relative text-sm leading-relaxed text-foreground/90">
              I build at the intersection of <span className="text-accent-soft">Artificial Intelligence</span> and <span className="text-accent-soft">Software Engineering</span> — turning ideas into products that work in the real world.
            </p>
            <div className="relative mt-6 flex items-center gap-3 border-t border-border pt-4">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img src={portrait} alt="" className="h-full w-full object-cover grayscale" />
              </div>
              <div>
                <div className="text-xs font-medium">Srimathi N</div>
                <div className="font-mono text-[10px] text-muted-foreground">AI · SDE · 3rd year</div>
              </div>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border">
            {facts.map((f) => (
              <div key={f.k} className="bg-background p-4">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{f.k}</dt>
                <dd className="mt-1 text-sm">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — long copy */}
        <div className="space-y-6 md:col-span-8" data-reveal>
          <p className="text-display text-3xl leading-[1.15] md:text-5xl md:leading-[1.05]">
            Hi, I'm <span className="text-accent-soft">Srimathi</span>. A third-year AI & Data Science student building toward an <span className="italic">AI Engineer / SDE</span> career.
          </p>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            I actively work on projects, coding challenges and continuous learning to strengthen technical skills and industry readiness. My goal is to ship intelligent, scalable, and impactful products that solve problems worth solving.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-accent-soft">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SKILL_CATEGORIES: { cat: string; tag: string; items: string[]; primary?: boolean }[] = [
  {
    cat: "AI & Machine Learning",
    tag: "Primary",
    primary: true,
    items: [
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "Agentic AI",
      "Prompt Engineering",
      "Vector Databases",
      "Computer Vision",
    ],
  },
  {
    cat: "Software Engineering",
    tag: "Core",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "System Design Fundamentals",
      "Backend Development",
      "REST API Development",
      "Software Development Lifecycle",
    ],
  },
  {
    cat: "Programming Languages",
    tag: "Lang",
    items: ["Python", "Java", "JavaScript", "C++", "SQL"],
  },
  {
    cat: "Frontend Development",
    tag: "UI",
    items: ["React.js", "HTML5", "CSS3", "Responsive Web Design"],
  },
  {
    cat: "Backend Technologies",
    tag: "API",
    items: ["Node.js", "Express.js", "API Integration", "Authentication & Authorization"],
  },
  {
    cat: "Databases & Tools",
    tag: "Stack",
    items: ["MongoDB", "SQL Databases", "Git", "GitHub", "Streamlit", "VS Code", "Postman"],
  },
];

function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <SectionLabel n="02 / Skills" title="The toolkit." kicker="6 domains · 40+ technologies" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((s, i) => (
          <div
            key={s.cat}
            data-reveal
            className={`glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${
              s.primary
                ? "border-accent/30 hover:border-accent/60 hover:shadow-[0_0_40px_-12px_rgba(107,144,128,0.25)]"
                : "hover:border-accent/40"
            }`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* Primary accent glow */}
            {s.primary && (
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            )}

            <div className="flex items-baseline justify-between">
              <div>
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest ${
                    s.primary ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {s.tag}
                </span>
                <h3 className="mt-1 text-display text-2xl">{s.cat}</h3>
              </div>
              {s.primary && (
                <span className="grid h-5 w-5 place-items-center rounded-full border border-accent/40 text-[10px] text-accent">
                  ✦
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <span
                  key={it}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-all duration-300 ${
                    s.primary
                      ? "border-accent/30 bg-accent/10 text-accent-soft hover:border-accent/60 hover:bg-accent/20"
                      : "border-border bg-secondary/30 text-muted-foreground hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    n: "01",
    title: "AI-Based Post-Harvest Loss Intelligence",
    tag: "AI · MERN · ML",
    desc: "AI-powered agricultural platform that reduces crop losses through predictive analytics and data-driven recommendations.",
    stack: ["MERN", "Python", "Machine Learning"],
    link: "https://post-harvest-loss.vercel.app/",
    status: "Live",
  },
  {
    n: "02",
    title: "UrbanHive — Real Estate Management",
    tag: "Full-Stack · MERN",
    desc: "Full-stack real estate platform connecting users, agents, and admins with role-based access and secure JWT auth.",
    stack: ["React", "Node", "Express", "MongoDB", "JWT", "Cloudinary"],
    link: "https://urbanhive-frontend.onrender.com/",
    status: "Frontend Live",
  },
  {
    n: "03",
    title: "Goal-Based Investment Portfolio Recommender",
    tag: "FinTech · Python",
    desc: "Financial planning system that recommends optimized portfolios based on goals, risk tolerance and duration.",
    stack: ["Python", "Streamlit", "PyPortfolioOpt", "yFinance", "Plotly"],
    link: "#",
    status: "Deploying",
  },
  {
    n: "04",
    title: "Real-Time Object Detection",
    tag: "Computer Vision",
    desc: "Real-time multi-object detection & classification system with webcam support and confidence visualization.",
    stack: ["Python", "OpenCV", "PyTorch", "YOLOv8"],
    link: "#",
    status: "Research",
  },
];

function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <SectionLabel n="03 / Work" title="Selected projects." kicker="A handpicked set across AI, full-stack & CV" />
      <div className="border-y border-border">
        {PROJECTS.map((p) => (
          <a
            key={p.n}
            href={p.link}
            target={p.link.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group relative block border-b border-border last:border-b-0 transition-colors hover:bg-secondary/20"
            data-reveal
          >
            {/* hover accent bar */}
            <span className="absolute left-0 top-0 h-full w-0 bg-accent transition-all duration-500 group-hover:w-1" />
            <div className="grid grid-cols-12 items-start gap-4 px-2 py-8 md:items-center md:px-6">
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono text-xs text-muted-foreground transition group-hover:text-accent">{p.n}</span>
              </div>
              <div className="col-span-10 md:col-span-5">
                <h3 className="text-display text-2xl leading-tight transition group-hover:translate-x-2 group-hover:text-accent-soft md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                  {p.stack.map((s, i) => (
                    <span key={s} className="font-mono text-[10px] text-muted-foreground">
                      {s}{i < p.stack.length - 1 && <span className="ml-2 text-accent/50">·</span>}
                    </span>
                  ))}
                </div>
              </div>
              <p className="col-span-12 text-sm leading-relaxed text-muted-foreground md:col-span-4">
                {p.desc}
              </p>
              <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition group-hover:border-accent group-hover:text-accent-soft">
                  {p.status}
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  ↗
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center" data-reveal>
        <a
          href="https://github.com/Srimathi331"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition hover:border-accent hover:text-accent-soft"
        >
          View all on GitHub <span className="text-accent">↗</span>
        </a>
      </div>
    </section>
  );
}

function Experience() {
  const courses = ["Data Structures", "Algorithms", "Machine Learning", "Deep Learning", "AI", "Full-Stack Dev"];
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <SectionLabel n="04 / Experience" title="Path so far." kicker="Internships · Education · Milestones" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Timeline rail */}
        <div className="relative lg:col-span-7">
          <div className="absolute bottom-0 left-3 top-2 w-px bg-gradient-to-b from-accent via-border to-transparent md:left-4" />

          {/* Item: Internship */}
          <div className="relative mb-10 pl-10 md:pl-14" data-reveal>
            <span className="absolute left-1.5 top-1.5 grid h-4 w-4 place-items-center md:left-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
              <span className="relative h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
            </span>
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Dec 1 — Dec 19, 2025</p>
                  <h3 className="mt-2 text-display text-3xl">MERN Stack Intern</h3>
                  <p className="mt-1 text-sm text-accent-soft">Infoziant</p>
                </div>
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Internship</span>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Full-stack web application development. Shipped a capstone <em className="not-italic text-foreground">Real Estate Management System</em> covering frontend, backend, authentication, database integration and REST APIs.
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                {[
                  "Real Estate Management System",
                  "React · Node · Express · MongoDB",
                  "JWT Authentication flows",
                  "RESTful API design & integration",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Item: Education */}
          <div className="relative pl-10 md:pl-14" data-reveal>
            <span className="absolute left-2 top-2 h-3 w-3 rounded-full border-2 border-accent bg-background md:left-3" />
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">2024 — 2028 · In progress</p>
                  <h3 className="mt-2 text-display text-3xl">B.Tech, AI & Data Science</h3>
                  <p className="mt-1 text-sm text-accent-soft">Sri Eshwar College of Engineering</p>
                </div>
                <div className="rounded-xl border border-border px-3 py-2 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">CGPA</div>
                  <div className="text-display text-2xl">7.83</div>
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Year 3 of 4</span>
                  <span className="font-mono">~50%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-accent to-accent-soft" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {courses.map((c) => (
                  <span key={c} className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar stats */}
        <aside className="space-y-4 lg:col-span-5" data-reveal>
          <div className="glass-card rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">What I bring</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["End-to-end full-stack delivery", "MERN, auth, APIs, deploy"],
                ["AI integration depth", "GenAI, LLMs, RAG, CV"],
                ["Engineering fundamentals", "DSA, system design basics"],
                ["Ship-first mindset", "Build · measure · iterate"],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 text-accent">✦</span>
                  <div>
                    <div className="text-foreground">{t}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border">
            <div className="bg-background p-5">
              <div className="text-display text-3xl">+<Counter to={15} /></div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Projects</div>
            </div>
            <div className="bg-background p-5">
              <div className="text-display text-3xl"><Counter to={4} /></div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Featured</div>
            </div>
            <div className="bg-background p-5">
              <div className="text-display text-3xl"><Counter to={6} /></div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Tech stacks</div>
            </div>
            <div className="bg-background p-5">
              <div className="text-display text-3xl"><Counter to={3} /></div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Languages</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    t: "AI Solutions",
    icon: "✦",
    d: "Generative AI apps, LLM systems, RAG pipelines & Agentic AI workflows.",
    items: ["GenAI Apps", "LLM Systems", "RAG", "Agentic AI"],
    span: "md:col-span-2",
  },
  {
    t: "Computer Vision",
    icon: "◐",
    d: "Object detection, image analysis & AI automation.",
    items: ["YOLO", "OpenCV", "PyTorch"],
    span: "",
  },
  {
    t: "Full-Stack Dev",
    icon: "◇",
    d: "MERN apps, scalable web platforms & backend APIs.",
    items: ["React", "Node", "Mongo"],
    span: "",
  },
  {
    t: "Software Engineering",
    icon: "▢",
    d: "REST API development, database design & application architecture.",
    items: ["REST", "SQL", "System Design"],
    span: "md:col-span-2",
  },
];

function Services() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <SectionLabel n="05 / Services" title="What I build." kicker="Four practices, one ship-first mindset" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <div
            key={s.t}
            data-reveal
            className={`glass-card group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 ${s.span}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border text-accent transition group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                {s.icon}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
            </div>
            <h3 className="mt-6 text-display text-3xl group-hover:text-accent-soft">{s.t}</h3>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">{s.d}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {s.items.map((it) => (
                <span key={it} className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-muted-foreground transition group-hover:bg-accent/15 group-hover:text-accent-soft">{it}</span>
              ))}
            </div>
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/0 blur-3xl transition duration-700 group-hover:bg-accent/25" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <SectionLabel n="06 / Mission" title="The why." kicker="A north star, in one paragraph" />
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12" data-reveal>
        <div className="md:col-span-2">
          <span className="text-display text-7xl text-accent/40 leading-none">M.</span>
        </div>
        <div className="md:col-span-10">
          <p className="text-display text-3xl leading-tight md:text-5xl md:leading-[1.1]">
            To bridge the gap between <span className="text-accent-soft">Artificial Intelligence</span> and <span className="text-accent-soft">Software Engineering</span> — shipping intelligent, scalable, and impactful products that leverage <span className="italic">Generative AI, LLMs, Agentic AI</span>, and <span className="italic">Computer Vision</span> to solve meaningful real-world challenges.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["Intelligent", "Models that reason, not just predict"],
              ["Scalable", "Systems that grow with the problem"],
              ["Impactful", "Solving things people actually care about"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border bg-background/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">{k}</div>
                <p className="mt-2 text-sm text-muted-foreground">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute -inset-x-20 -inset-y-20 -z-10 bg-[radial-gradient(circle_at_30%_50%,oklch(0.72_0.04_165_/_15%),transparent_60%)]" />
      </div>
    </section>
  );
}


function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "srimathinatarasan@gmail.com";
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <SectionLabel n="07 / Contact" title="Let's build something." />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div data-reveal>
          <p className="text-display text-5xl md:text-7xl">
            Have an idea?
            <br />
            <span className="text-accent-soft italic">Let's talk.</span>
          </p>
          <p className="mt-6 max-w-md text-sm text-muted-foreground">
            Open for internships, AI/SDE roles, and collaborations on impactful products.
          </p>
        </div>

        <div className="space-y-2 text-sm" data-reveal>
          {[
            { l: "Email", v: email, copy: true },
            { l: "Phone", v: "+91 7550155821" },
            { l: "Location", v: "Udumalpet, Tiruppur, TN, India" },
            { l: "LinkedIn", v: "linkedin.com/in/srimathin28", href: "https://www.linkedin.com/in/srimathin28/" },
            { l: "GitHub", v: "github.com/Srimathi331", href: "https://github.com/Srimathi331" },
          ].map((row) => (
            <div key={row.l} className="group flex items-center justify-between border-b border-border py-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{row.l}</span>
              {row.href ? (
                <a href={row.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent-soft">
                  {row.v} <span className="text-accent">↗</span>
                </a>
              ) : row.copy ? (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(email);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="flex items-center gap-2 hover:text-accent-soft"
                >
                  {row.v}
                  <span className="text-xs text-accent">{copied ? "✓ copied" : "copy"}</span>
                </button>
              ) : (
                <span>{row.v}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 text-xs text-muted-foreground md:flex-row lg:px-12">
        <p>Designed & developed by Srimathi N — AI Engineer & Software Developer</p>
        <p className="font-mono">© {new Date().getFullYear()} · All rights reserved</p>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
      <div className="h-full bg-accent transition-[width] duration-100" style={{ width: `${p * 100}%` }} />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (!show) return null;
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition hover:border-accent hover:text-accent-soft"
    >
      ↑
    </a>
  );
}

/* ─────────── page ─────────── */

function Portfolio() {
  useReveal();
  return (
    <>
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.7,.2,1)}
        [data-reveal].revealed{opacity:1;transform:none}
      `}</style>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Services />
        <Mission />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
