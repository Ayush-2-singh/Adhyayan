import { useEffect, useRef, useState } from "react";

const SUPABASE_URL = "https://itulduswpzwzvfyxkpjx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dWxkdXN3cHp3enZmeXhrcGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDU5NzYsImV4cCI6MjA5MDI4MTk3Nn0.H1nZe6s7FDTsM1iTO8kfmrUVoxiErTN4qO1tPwjMQms";

interface Course { id: string; title: string; badge: string; description: string; sort_order: number; }
interface Faculty { id: string; name: string; subject: string; experience: string; previous_org: string; sort_order: number; }

async function sbGet(table: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=sort_order.asc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  if (!res.ok) return [];
  return res.json();
}

async function submitEnquiry(data: Record<string, string>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(data)
  });
  return res.ok || res.status === 201;
}

/* ── Animated bulb SVG ── */
function AnimatedBulb({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="bulb-glow inline-block" aria-label="Light bulb - Adhyayan Classes logo icon">
      <ellipse cx="40" cy="72" rx="14" ry="4" fill="rgba(27,61,110,0.12)" />
      <rect x="30" y="60" width="20" height="5" rx="2" fill="#1B3D6E" opacity="0.3" />
      <rect x="28" y="65" width="24" height="4" rx="2" fill="#1B3D6E" opacity="0.25" />
      <rect x="30" y="69" width="20" height="3" rx="1.5" fill="#1B3D6E" opacity="0.2" />
      {/* Glass bulb */}
      <path
        d="M25 38 C25 24, 55 24, 55 38 C55 47, 50 54, 48 58 L32 58 C30 54, 25 47, 25 38Z"
        className="bulb-glass-on"
        stroke="#E8651A" strokeWidth="1.5"
      />
      {/* Filament */}
      <path
        d="M34 53 L34 45 Q37 41 40 45 Q43 41 46 45 L46 53"
        className="bulb-filament-on"
        stroke="#FFD580" strokeWidth="2" strokeLinecap="round" fill="none"
      />
      {/* Base */}
      <rect x="31" y="58" width="18" height="3" rx="1" fill="#1B3D6E" />
      {/* Rays */}
      <line x1="40" y1="14" x2="40" y2="8" stroke="#FFB347" strokeWidth="2.5" strokeLinecap="round" className="bulb-glow" />
      <line x1="56" y1="20" x2="60" y2="16" stroke="#FFB347" strokeWidth="2.5" strokeLinecap="round" className="bulb-glow" />
      <line x1="24" y1="20" x2="20" y2="16" stroke="#FFB347" strokeWidth="2.5" strokeLinecap="round" className="bulb-glow" />
      <line x1="62" y1="36" x2="68" y2="36" stroke="#FFB347" strokeWidth="2.5" strokeLinecap="round" className="bulb-glow" />
      <line x1="18" y1="36" x2="12" y2="36" stroke="#FFB347" strokeWidth="2.5" strokeLinecap="round" className="bulb-glow" />
    </svg>
  );
}

/* ── Hero Section ── */
function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const colors = ["#E8651A", "#1B3D6E", "#F4A460", "#FFB347"];
    const pg = particlesRef.current;
    if (!pg) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "ac-particle";
      const size = Math.random() * 80 + 20;
      p.style.cssText = `width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}%;animation-duration:${Math.random() * 12 + 8}s;animation-delay:${Math.random() * 8}s;`;
      pg.appendChild(p);
    }

    const words = ["ज्ञान", "Wisdom", "Learn", "Grow", "Excel", "उड़ान", "सफलता", "Think", "Dream", "Achieve", "शिक्षा", "Rise", "Inspire", "Lead"];
    const wc = wordsRef.current;
    if (!wc) return;

    let interval: ReturnType<typeof setInterval>;
    function spawnWord() {
      if (!wc) return;
      const w = document.createElement("div");
      w.className = "ac-flying-word";
      const size = Math.random() * 18 + 12;
      const startX = 30 + Math.random() * 40;
      const startY = 30 + Math.random() * 20;
      const angle = (Math.random() - 0.5) * 60;
      const dx = (Math.random() - 0.4) * 300 + "px";
      const dy = -(Math.random() * 250 + 100) + "px";
      w.textContent = words[Math.floor(Math.random() * words.length)];
      w.style.cssText = `left:${startX}%;top:${startY}%;font-size:${size}px;--r:${angle}deg;--dx:${dx};--dy:${dy};animation-duration:${Math.random() * 3 + 4}s;animation-delay:${Math.random() * 2}s;`;
      wc.appendChild(w);
      setTimeout(() => w.remove(), 7000);
    }
    interval = setInterval(spawnWord, 600);
    for (let i = 0; i < 5; i++) setTimeout(spawnWord, i * 400);

    return () => clearInterval(interval);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="ac-hero" id="home" aria-label="Adhyayan Classes Hero">
      <div className="ac-glow-orb" style={{ width: 400, height: 400, background: "rgba(232,101,26,0.12)", top: -100, right: -100 }} />
      <div className="ac-glow-orb" style={{ width: 300, height: 300, background: "rgba(232,101,26,0.08)", bottom: 50, left: -80, animationDelay: "2s" }} />
      <div className="ac-burst-ring" style={{ animation: "acBurstRing 1.5s ease-out 0.5s both" }} />
      <div className="ac-burst-ring" style={{ animation: "acBurstRing 1.5s ease-out 0.8s both" }} />
      <div className="ac-burst-ring" style={{ animation: "acBurstRing 1.5s ease-out 1.1s both" }} />

      <div ref={particlesRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} />
      <div ref={wordsRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} />

      {/* Animated birds */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, pointerEvents: "none" }}>
        {[0.5, 1.0, 1.5].map((delay, i) => (
          <svg key={i} className="ac-bird" width={48 - i * 8} height={30 - i * 5} viewBox="0 0 48 30" fill="none"
            style={{ animationDelay: `${delay}s`, top: [30, 10, 50][i], right: [20, 60, 0][i], position: "absolute" }}>
            <path className="ac-wing" d="M24 15 C16 8, 4 5, 0 8 C8 10, 16 14, 24 15Z" fill={i === 1 ? "#F4A460" : "#E8651A"} opacity={i === 2 ? 0.7 : 1} />
            <path className="ac-wing" d="M24 15 C32 8, 44 5, 48 8 C40 10, 32 14, 24 15Z" fill={i === 1 ? "#F4A460" : "#E8651A"} opacity={i === 2 ? 0.7 : 1} />
            <ellipse cx="24" cy="15" rx="4" ry="2.5" fill={i === 1 ? "#F4A460" : "#E8651A"} opacity={i === 2 ? 0.7 : 1} />
          </svg>
        ))}
      </div>

      {/* Book + Logo SVG */}
      <div style={{ position: "relative", width: 340, height: 290, marginBottom: 30, animation: "acSceneEntry 1.2s cubic-bezier(.22,1,.36,1) both" }}>
        {/* Bulb animation in center-right of book */}
        <div style={{ position: "absolute", top: 20, right: 60, zIndex: 2 }}>
          <AnimatedBulb size={64} />
        </div>
        <svg style={{ width: 340, height: 220, position: "absolute", bottom: 0, left: 0 }} viewBox="0 0 340 210" fill="none">
          <defs>
            <linearGradient id="acCoverL" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22508C" />
              <stop offset="100%" stopColor="#1B3D6E" />
            </linearGradient>
            <linearGradient id="acCoverR" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B3D6E" />
              <stop offset="100%" stopColor="#142f54" />
            </linearGradient>
            <linearGradient id="acPageL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e8e0d0" />
              <stop offset="100%" stopColor="#f7f3ec" />
            </linearGradient>
            <linearGradient id="acSpineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0d2444" />
              <stop offset="50%" stopColor="#1B3D6E" />
              <stop offset="100%" stopColor="#0d2444" />
            </linearGradient>
          </defs>
          <ellipse cx="170" cy="204" rx="120" ry="6" fill="rgba(27,61,110,0.18)" />
          <rect x="18" y="30" width="148" height="168" rx="5" fill="url(#acCoverL)" />
          <rect x="34" y="36" width="132" height="160" rx="2" fill="url(#acPageL)" />
          {[60,72,84,96,108,120,132,144,156,168].map(y => (
            <line key={y} x1="44" y1={y} x2="158" y2={y} stroke="#c8bfad" strokeWidth="0.8" />
          ))}
          <line x1="58" y1="36" x2="58" y2="196" stroke="#e8a0a0" strokeWidth="1" opacity="0.6" />
          <rect x="174" y="30" width="148" height="168" rx="5" fill="url(#acCoverR)" />
          <rect x="162" y="28" width="16" height="172" rx="3" fill="url(#acSpineGrad)" />
          {[55,75,95,115,135,155,175].map(cy => (
            <ellipse key={cy} cx="170" cy={cy} rx="7" ry="4" fill="none" stroke="#E8651A" strokeWidth="2" />
          ))}
          <circle cx="22" cy="60" r="4" fill="#0d2444" stroke="#E8651A" strokeWidth="1.5" />
          <circle cx="22" cy="110" r="4" fill="#0d2444" stroke="#E8651A" strokeWidth="1.5" />
          <circle cx="22" cy="160" r="4" fill="#0d2444" stroke="#E8651A" strokeWidth="1.5" />
          <path d="M105 38 Q170 -18 235 38" stroke="#E8651A" strokeWidth="6" fill="none" strokeLinecap="round"
            style={{ strokeDasharray: 220, strokeDashoffset: 220, animation: "acArcDraw 1.5s ease 0.8s forwards" }} />
          <polygon points="235,34 238,44 248,44 240,50 243,60 235,54 227,60 230,50 222,44 232,44" fill="#E8651A"
            style={{ animation: "acStarPop 0.5s ease 1.8s both", opacity: 0, transformOrigin: "235px 47px" }} />
        </svg>
      </div>

      {/* Logo text */}
      <div style={{ textAlign: "center", animation: "acTextEntry 1.4s cubic-bezier(.22,1,.36,1) 0.3s both" }}>
        <div className="ac-logo-name">
          ADH<span style={{ color: "#E8651A", position: "relative" }}>Y</span>AYAN
          <span className="ac-star-accent">★</span>
        </div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(1.2rem,3vw,1.8rem)", fontWeight: 600, color: "#1B3D6E", letterSpacing: "0.35em", marginTop: 12, opacity: 0.75, textTransform: "uppercase" }}>
          Classes
        </div>
      </div>

      <p style={{ marginTop: 28, fontSize: "clamp(1rem,2vw,1.25rem)", color: "#1B3D6E", opacity: 0.6, fontWeight: 600, letterSpacing: "0.05em", animation: "acTextEntry 1.6s cubic-bezier(.22,1,.36,1) 0.6s both" }}>
        Where Knowledge Takes Flight
      </p>

      <a
        className="ac-cta-btn"
        href="#contact"
        onClick={e => { e.preventDefault(); scrollTo("contact"); }}
        aria-label="Enroll Now – go to enquiry form"
      >
        Enroll Now &nbsp;→
      </a>

      {/* Stats */}
      <div style={{ position: "absolute", bottom: 40, display: "flex", gap: 60, animation: "acTextEntry 2s cubic-bezier(.22,1,.36,1) 1s both" }}>
        {[["5000+", "Students"], ["120+", "Courses"], ["98%", "Success Rate"]].map(([num, label], i) => (
          <div key={i} style={{ textAlign: "center", ...(i > 0 ? { borderLeft: "1px solid rgba(27,61,110,0.15)", paddingLeft: 60 } : {}) }}>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "2rem", fontWeight: 700, color: "#E8651A", display: "block" }}>{num}</span>
            <span style={{ fontSize: "0.75rem", color: "#1B3D6E", opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 16, right: 24, fontSize: "0.7rem", color: "#1B3D6E", opacity: 0.35, letterSpacing: "0.15em", textTransform: "uppercase", writingMode: "vertical-rl" }}>
        Scroll to explore
      </div>
    </section>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [open, setOpen] = useState(false);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 40px", borderBottom: "1.5px solid #eee", position: "sticky", top: 0, background: "#fff", zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }} role="navigation" aria-label="Main navigation">
      <button className="nav-logo" onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} aria-label="Adhyayan Classes home">
        <img src="/logo.png" alt="Adhyayan Classes logo" style={{ height: 52, width: "auto", objectFit: "contain" }} />
      </button>

      {/* Desktop nav */}
      <ul style={{ listStyle: "none", display: "flex", alignItems: "center", gap: 22, margin: 0, padding: 0 }} className="hidden md:flex">
        {[["courses", "Courses"], ["why", "Why Us"], ["faculty", "Faculty"], ["gallery", "Gallery"]].map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}
              style={{ textDecoration: "none", color: "#333", fontSize: "0.9rem", fontWeight: 600, transition: "color 0.2s", cursor: "pointer" }}
              onMouseOver={e => (e.currentTarget.style.color = "#1a237e")}
              onMouseOut={e => (e.currentTarget.style.color = "#333")}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("contact"); }}
            style={{ background: "#1a237e", color: "#fff", padding: "8px 18px", borderRadius: 4, textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>
            Enquire Now
          </a>
        </li>
        <li>
          <a href="/admin.html" style={{ color: "#bbb", fontSize: "0.78rem", fontWeight: 400, textDecoration: "none" }}>Admin</a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem" }} className="md:hidden" aria-label="Toggle menu">
        ☰
      </button>

      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", padding: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", zIndex: 200 }}>
          {[["courses", "Courses"], ["why", "Why Us"], ["faculty", "Faculty"], ["gallery", "Gallery"], ["contact", "Enquire Now"]].map(([id, label]) => (
            <div key={id} style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}
                style={{ textDecoration: "none", color: id === "contact" ? "#1a237e" : "#333", fontWeight: 600 }}>
                {label}
              </a>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero Banner (after hero landing) ── */
function HeroBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "70px 40px 60px", maxWidth: 1100, margin: "0 auto", gap: 40, flexWrap: "wrap" }}>
      <div style={{ animation: "fadeUp 0.7s ease forwards", flex: 1, minWidth: 280 }}>
        <h1 style={{ fontFamily: "'Merriweather', serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", lineHeight: 1.4, color: "#1a237e", maxWidth: 500 }}>
          No.1 Coaching for Class IX to XII in Varanasi
        </h1>
        <p style={{ marginTop: 16, fontSize: "1rem", color: "#555", maxWidth: 440, lineHeight: 1.75 }}>
          Pre-Foundation (IX & X), Engineering and Medical Entrance — Mentored by Ex Faculty of Aakash Institute &amp; Senior PGT with More than 10 Years of Experience.
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ background: "#e65100", color: "#fff", padding: "13px 28px", border: "none", borderRadius: 4, fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block", animation: "pulse 2.5s ease infinite" }}>
            Book a Free Demo Class
          </a>
          <a href="#courses" onClick={e => { e.preventDefault(); document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ background: "transparent", color: "#1a237e", padding: "13px 28px", border: "2px solid #1a237e", borderRadius: 4, fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
            View Courses
          </a>
        </div>
      </div>
      <div style={{ animation: "float 3s ease-in-out infinite", flex: "0 0 auto" }}>
        <img src="/logo.png" alt="Adhyayan Classes – Dream and Achieve" style={{ width: 300, height: 260, objectFit: "contain", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }} />
      </div>
    </div>
  );
}

/* ── Stats Bar ── */
function StatsBar() {
  return (
    <div style={{ background: "#1a237e", color: "#fff", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} role="complementary" aria-label="Key statistics">
      {[["5000+", "Students Mentored"], ["10+", "Years Experience"], ["98%", "Success Rate"], ["3", "Courses Offered"]].map(([num, label]) => (
        <div key={label} style={{ textAlign: "center", padding: "28px 16px", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
          <strong style={{ display: "block", fontSize: "1.9rem", fontFamily: "'Merriweather',serif" }}>{num}</strong>
          <span style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: 4, display: "block" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Courses Section ── */
function CoursesSection({ courses }: { courses: Course[] }) {
  const defaultCourses: Course[] = [
    { id: "1", title: "Pre-Foundation – IX & X", badge: "Pre-Foundation", description: "Comprehensive foundation building for Class IX & X students. Strong conceptual clarity in Mathematics, Science and English.", sort_order: 1 },
    { id: "2", title: "Foundation – XI & XII (JEE & NEET)", badge: "Foundation", description: "Rigorous preparation for JEE & NEET entrance exams. Focus on Physics, Chemistry, Mathematics and Biology by expert faculty.", sort_order: 2 },
    { id: "3", title: "Commerce Classes – XI & XII", badge: "Commerce", description: "Expert coaching for Commerce students covering Accountancy, Business Studies, Economics and Mathematics.", sort_order: 3 },
  ];

  const display = courses.length > 0 ? courses : defaultCourses;

  const badgeColors: Record<string, string> = {
    "Pre-Foundation": "#e8eaf6",
    "Foundation": "#e3f2fd",
    "Commerce": "#e8f5e9",
  };

  return (
    <section id="courses" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 40px" }} aria-labelledby="courses-heading">
      <h2 id="courses-heading" style={{ fontFamily: "'Merriweather',serif", fontSize: "1.7rem", color: "#1a237e", marginBottom: 8 }}>Our Courses</h2>
      <p style={{ color: "#888", fontSize: "0.95rem", marginBottom: 36 }}>Expert-led programs designed for academic excellence</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {display.map(c => (
          <article key={c.id} style={{ border: "1.5px solid #ddd", borderRadius: 10, padding: "24px 20px", transition: "all 0.2s", cursor: "default", background: "#fff" }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1a237e"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(26,35,126,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "#ddd"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
            <span style={{ display: "inline-block", background: badgeColors[c.badge] || "#e8eaf6", color: "#1a237e", fontSize: "0.72rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {c.badge}
            </span>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a237e", marginBottom: 6 }}>{c.title}</h3>
            <p style={{ fontSize: "0.87rem", color: "#666", lineHeight: 1.6 }}>{c.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Why Us ── */
function WhyUsSection() {
  const reasons = [
    { title: "Expert Faculty", desc: "Mentored by Ex Faculty of Aakash Institute & Senior PGT teachers with 10+ years of proven experience." },
    { title: "Personalized Attention", desc: "Small batch sizes ensure every student gets individual attention and doubt resolution." },
    { title: "Result-Oriented Approach", desc: "Structured curriculum aligned with board exams, JEE, NEET and Commerce streams." },
    { title: "Holistic Development", desc: "Beyond academics — we build confidence, discipline and problem-solving skills in every student." },
  ];
  return (
    <section id="why" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 40px" }} aria-labelledby="why-heading">
      <h2 id="why-heading" style={{ fontFamily: "'Merriweather',serif", fontSize: "1.7rem", color: "#1a237e", marginBottom: 8 }}>Why Choose Adhyayan?</h2>
      <p style={{ color: "#888", fontSize: "0.95rem", marginBottom: 36 }}>What makes us different from the rest</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {reasons.map(r => (
          <div key={r.title} style={{ padding: 24, background: "#f5f7ff", borderRadius: 8, borderLeft: "4px solid #1a237e", transition: "transform 0.2s" }}
            onMouseOver={e => (e.currentTarget.style.transform = "translateX(4px)")}
            onMouseOut={e => (e.currentTarget.style.transform = "none")}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a237e", marginBottom: 8 }}>{r.title}</h3>
            <p style={{ fontSize: "0.87rem", color: "#555", lineHeight: 1.6 }}>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Faculty Section ── */
function FacultySection({ faculty }: { faculty: Faculty[] }) {
  const defaultFaculty: Faculty[] = [
    { id: "f1", name: "Nitesh Kumar Pandey", subject: "Mathematics", experience: "Founder & Director", previous_org: "Ex Faculty – Aakash Institute & Senior PGT, More than 10 Years of Experience", sort_order: 0 },
    { id: "f2", name: "Faculty Member", subject: "Physics", experience: "8+ Years Experience", previous_org: "Ex Faculty – Aakash Institute & Senior PGT, More than 10 Years of Experience", sort_order: 1 },
    { id: "f3", name: "Faculty Member", subject: "Chemistry", experience: "10+ Years Experience", previous_org: "Ex Faculty – Aakash Institute & Senior PGT, More than 10 Years of Experience", sort_order: 2 },
    { id: "f4", name: "Faculty Member", subject: "Biology", experience: "12+ Years Experience", previous_org: "Ex Faculty – Aakash Institute & Senior PGT, More than 10 Years of Experience", sort_order: 3 },
  ];

  const display = faculty.length > 0 ? faculty : defaultFaculty;
  const founder = display.find(f => f.sort_order === 0 || f.name.toLowerCase().includes("nitesh") || f.subject.toLowerCase() === "mathematics");
  const others = display.filter(f => f !== founder);

  return (
    <section id="faculty" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 40px" }} aria-labelledby="faculty-heading">
      <h2 id="faculty-heading" style={{ fontFamily: "'Merriweather',serif", fontSize: "1.7rem", color: "#1a237e", marginBottom: 8 }}>Mentored By</h2>
      <p style={{ color: "#888", fontSize: "0.95rem", marginBottom: 36 }}>Our expert team dedicated to your success</p>

      {/* Founder highlight */}
      {founder && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ background: "linear-gradient(135deg, #1B3D6E 0%, #22508C 100%)", borderRadius: 16, padding: "32px 40px", display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", boxShadow: "0 8px 40px rgba(27,61,110,0.25)" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <img
                src="/founder.jpg"
                alt={`${founder.name} – Founder, Adhyayan Classes`}
                style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover", display: "block" }}
                className="founder-highlight"
              />
              <div style={{ position: "absolute", bottom: -4, right: -4, background: "#E8651A", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }} title="Founder">
                ⭐
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="founder-badge">Founder &amp; Director</div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: 4, fontFamily: "'Merriweather',serif" }}>{founder.name}</h3>
              <div style={{ color: "#FFB347", fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{founder.subject}</div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", lineHeight: 1.6 }}>{founder.previous_org || "Ex Faculty – Aakash Institute & Senior PGT, More than 10 Years of Experience"}</div>
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600 }}>🎓 Maths Expert</span>
                <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600 }}>⭐ 10+ Years</span>
                <span style={{ background: "rgba(255,179,71,0.25)", color: "#FFB347", padding: "4px 12px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700 }}>🏆 Aakash Ex-Faculty</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other faculty */}
      {others.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {others.map(f => (
            <div key={f.id} style={{ border: "1.5px solid #eee", borderRadius: 10, padding: "24px 16px", textAlign: "center", transition: "all 0.2s", background: "#fff" }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 14px", border: "3px solid #c5cae9", overflow: "hidden", background: "#e8eaf6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                🎓
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a237e" }}>{f.name}</h3>
              <div style={{ fontSize: "0.75rem", color: "#e65100", fontWeight: 600, margin: "5px 0 4px" }}>{f.subject}</div>
              <p style={{ fontSize: "0.75rem", color: "#888" }}>{f.previous_org || "Ex Faculty – Aakash Institute & Senior PGT, More than 10 Years of Experience"}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Gallery Section ── */
function GallerySection() {
  return (
    <section id="gallery" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 40px" }} aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" style={{ fontFamily: "'Merriweather',serif", fontSize: "1.7rem", color: "#1a237e", marginBottom: 8 }}>Gallery</h2>
      <p style={{ color: "#888", fontSize: "0.95rem", marginBottom: 36 }}>Moments from Adhyayan Classes</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, maxWidth: 860 }}>
        <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.1)", background: "#e8eaf6" }}>
          <img src="/founder.jpg" alt="Nitesh Kumar Pandey – Founder Adhyayan Classes Varanasi" style={{ width: "100%", height: 260, objectFit: "cover", display: "block", transition: "transform 0.3s" }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={e => (e.currentTarget.style.transform = "none")} />
          <div style={{ padding: "10px 14px", background: "#f5f7ff", fontSize: "0.82rem", color: "#666" }}>
            Founder – Nitesh Kumar Pandey, Adhyayan Classes Varanasi
          </div>
        </div>
        <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.1)", background: "#f5f0e8" }}>
          <img src="/logo.png" alt="Adhyayan Classes – Dream and Achieve logo" style={{ width: "100%", height: 260, objectFit: "contain", display: "block", background: "#f5f0e8", padding: 20 }} />
          <div style={{ padding: "10px 14px", background: "#f5f7ff", fontSize: "0.82rem", color: "#666" }}>
            Dream and Achieve – Adhyayan Classes, Varanasi
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact/Enquiry Form ── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");
    const ok = await submitEnquiry({ ...form, created_at: new Date().toISOString() });
    setStatus(ok ? "done" : "error");
  }

  return (
    <section id="contact" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 40px" }} aria-labelledby="contact-heading">
      <h2 id="contact-heading" style={{ fontFamily: "'Merriweather',serif", fontSize: "1.7rem", color: "#1a237e", marginBottom: 8 }}>Get in Touch</h2>
      <p style={{ color: "#888", fontSize: "0.95rem", marginBottom: 36 }}>Fill in the form below and we'll get back to you</p>
      <div style={{ display: "flex", gap: 50, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.9, marginBottom: 12 }}>
            <strong style={{ color: "#222" }}>📍 Address:</strong><br />
            Adhyayan Classes, Varanasi, Uttar Pradesh
          </p>
          <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.9, marginBottom: 12 }}>
            <strong style={{ color: "#222" }}>📞 Phone:</strong><br />
            <a href="tel:+917080836344" style={{ color: "#1a237e", textDecoration: "none" }}>+91 70808 36344</a>
          </p>
          <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.9, marginBottom: 12 }}>
            <strong style={{ color: "#222" }}>✉️ Email:</strong><br />
            <a href="mailto:adhyayanclasses@gmail.com" style={{ color: "#1a237e", textDecoration: "none" }}>adhyayanclasses@gmail.com</a>
          </p>
          <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.9 }}>
            <strong style={{ color: "#222" }}>🕐 Hours:</strong><br />
            Mon–Sat: 7:00 AM – 8:00 PM
          </p>
        </div>

        <form style={{ flex: 2, minWidth: 260 }} onSubmit={handleSubmit} aria-label="Enquiry form">
          {[
            { name: "name", label: "Full Name *", placeholder: "Your Name", type: "text" },
            { name: "phone", label: "Phone Number *", placeholder: "+91 XXXXX XXXXX", type: "tel" },
            { name: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
          ].map(f => (
            <div key={f.name} style={{ marginBottom: 14 }}>
              <label htmlFor={f.name} style={{ fontSize: "0.8rem", fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>{f.label}</label>
              <input
                id={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.name as keyof typeof form]}
                onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                required={f.label.includes("*")}
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ddd", borderRadius: 7, fontSize: "0.92rem", outline: "none", fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = "#1a237e"}
                onBlur={e => e.target.style.borderColor = "#ddd"}
              />
            </div>
          ))}

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="course" style={{ fontSize: "0.8rem", fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Interested Course</label>
            <select id="course" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ddd", borderRadius: 7, fontSize: "0.92rem", outline: "none", fontFamily: "inherit" }}>
              <option value="">Select a course</option>
              <option>Pre-Foundation (IX & X)</option>
              <option>Foundation – XI & XII (JEE & NEET)</option>
              <option>Commerce Classes – XI & XII</option>
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="message" style={{ fontSize: "0.8rem", fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Message</label>
            <textarea id="message" placeholder="Any specific queries?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #ddd", borderRadius: 7, fontSize: "0.92rem", outline: "none", fontFamily: "inherit", height: 100, resize: "vertical" }} />
          </div>

          <button type="submit" disabled={status === "sending"}
            style={{ background: status === "sending" ? "#9fa8da" : "#1a237e", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 6, fontSize: "0.95rem", fontWeight: 700, cursor: status === "sending" ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "background 0.2s", width: "100%" }}>
            {status === "sending" ? "Sending…" : "Send Enquiry"}
          </button>

          {status === "done" && <div style={{ marginTop: 12, color: "#2e7d32", fontWeight: 600, fontSize: "0.9rem" }}>✅ Enquiry sent! We'll contact you soon.</div>}
          {status === "error" && <div style={{ marginTop: 12, color: "#c62828", fontWeight: 600, fontSize: "0.9rem" }}>❌ Something went wrong. Please try calling us directly.</div>}
        </form>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{ background: "#111", color: "#aaa", textAlign: "center", padding: "28px 40px", fontSize: "0.85rem" }} role="contentinfo">
      <p>© {new Date().getFullYear()} <span style={{ color: "#e65100" }}>Adhyayan Classes</span>, Varanasi. All rights reserved.</p>
      <p style={{ marginTop: 6 }}>Dream and Achieve | Pre-Foundation · JEE & NEET · Commerce</p>
    </footer>
  );
}

/* ── Main App ── */
export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    sbGet("courses").then(setCourses).catch(() => setCourses([]));
    sbGet("faculty").then(setFaculty).catch(() => setFaculty([]));
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-animate").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HeroBanner />
        <StatsBar />
        <hr style={{ border: "none", borderTop: "1.5px solid #eee", maxWidth: 1100, margin: "0 auto" }} />
        <CoursesSection courses={courses} />
        <hr style={{ border: "none", borderTop: "1.5px solid #eee", maxWidth: 1100, margin: "0 auto" }} />
        <WhyUsSection />
        <hr style={{ border: "none", borderTop: "1.5px solid #eee", maxWidth: 1100, margin: "0 auto" }} />
        <FacultySection faculty={faculty} />
        <hr style={{ border: "none", borderTop: "1.5px solid #eee", maxWidth: 1100, margin: "0 auto" }} />
        <GallerySection />
        <hr style={{ border: "none", borderTop: "1.5px solid #eee", maxWidth: 1100, margin: "0 auto" }} />
        <ContactSection />
      </main>
      <Footer />

      {/* WhatsApp float */}
      <a
        href="https://wa.me/917080836344?text=Hello%2C%20I%20am%20interested%20in%20joining%20Adhyayan%20Classes"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat on WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp Us
      </a>
    </>
  );
}
