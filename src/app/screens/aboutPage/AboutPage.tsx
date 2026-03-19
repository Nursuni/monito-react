import React, { useEffect, useRef, useState } from "react";
import { Container } from "@mui/material";
import Address from "./Address";

/* ─── Intersection Observer hook for scroll-reveal ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const OFFERS = [
  {
    icon: "🚚",
    title: "Free Delivery",
    desc: "Free shipping on all orders over $49.99",
  },
  {
    icon: "⭐",
    title: "Premium Quality",
    desc: "Only the finest products for your pets",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    desc: "100% secure and encrypted transactions",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    desc: "Always here to help you and your pet",
  },
];

const STATS = [
  { value: 10, suffix: "k+", label: "Happy Pets" },
  { value: 500, suffix: "+", label: "Products" },
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function AboutUsPage() {
  const missionReveal = useReveal();
  const offersReveal = useReveal();
  const statsReveal = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .au-root, .au-root * {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          box-sizing: border-box;
        }
        .au-root {
          --blue-50:  #EFF6FF;
          --blue-100: #DBEAFE;
          --blue-200: #BFDBFE;
          --blue-500: #3B82F6;
          --blue-600: #2563EB;
          --blue-700: #1D4ED8;
          --ink:      #0F172A;
          --muted:    #64748B;
          --border:   #E2E8F0;
          --bg:       #F8FAFF;
        }

        /* ── Keyframes ── */
        @keyframes au-fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes au-fadeLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes au-fadeRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes au-scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes au-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes au-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
          50%      { box-shadow: 0 0 0 10px rgba(37,99,235,0); }
        }
        @keyframes au-spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes au-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        .au-reveal       { opacity: 0; }
        .au-reveal.show  { animation: au-fadeUp    0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .au-reveal-l     { opacity: 0; }
        .au-reveal-l.show{ animation: au-fadeLeft  0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .au-reveal-r     { opacity: 0; }
        .au-reveal-r.show{ animation: au-fadeRight 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        /* ── Hero ── */
        .au-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(150deg, #EFF6FF 0%, #F8FAFF 60%, #fff 100%);
          padding: 80px 0 70px;
          text-align: center;
          border-bottom: 2px solid var(--border);
        }
        .au-hero-orb {
          position: absolute; border-radius: 50%; filter: blur(55px); pointer-events: none;
        }
        .au-hero-orb--1 { width: 300px; height: 300px; background: rgba(37,99,235,0.07); top: -80px; right: -40px; animation: au-float 9s ease-in-out infinite; }
        .au-hero-orb--2 { width: 180px; height: 180px; background: rgba(96,165,250,0.09); bottom: -40px; left: 80px; animation: au-float 7s ease-in-out infinite; animation-delay: 2s; }

        .au-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--blue-600);
          margin-bottom: 16px;
          animation: au-fadeUp 0.5s ease both;
        }
        .au-hero-eyebrow-line {
          width: 28px; height: 3px; border-radius: 2px;
          background: var(--blue-600); display: block;
        }
        .au-hero-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800; color: var(--ink);
          letter-spacing: -0.03em; line-height: 1.1;
          margin: 0 0 16px;
          animation: au-fadeUp 0.55s 0.1s ease both;
        }
        .au-hero-title span { color: var(--blue-600); }
        .au-hero-sub {
          font-size: 16px; font-weight: 500; color: var(--muted);
          max-width: 520px; margin: 0 auto;
          animation: au-fadeUp 0.55s 0.2s ease both;
        }

        /* ── Mission ── */
        .au-mission {
          padding: 96px 0;
          background: #fff;
        }
        .au-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .au-section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--blue-600);
          display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
        }
        .au-section-label::before {
          content: ''; width: 24px; height: 3px;
          background: var(--blue-600); border-radius: 2px; display: block;
        }
        .au-section-title {
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 800; color: var(--ink);
          letter-spacing: -0.025em; line-height: 1.15;
          margin: 0 0 20px;
        }
        .au-mission-text {
          font-size: 15px; font-weight: 500; color: var(--muted);
          line-height: 1.75; margin: 0 0 16px;
        }
        .au-mission-img-wrap {
          position: relative;
        }
        .au-mission-img-wrap img {
          width: 100%; border-radius: 24px;
          box-shadow: 0 24px 64px rgba(37,99,235,0.13);
          display: block;
        }
        /* Decorative ring */
        .au-mission-img-wrap::before {
          content: '';
          position: absolute; top: -16px; right: -16px;
          width: 100%; height: 100%;
          border: 3px solid var(--blue-200);
          border-radius: 28px;
          z-index: 0;
        }
        .au-mission-img-wrap img { position: relative; z-index: 1; }

        /* ── Stats ── */
        .au-stats {
          padding: 72px 0;
          background: var(--blue-600);
          position: relative; overflow: hidden;
        }
        .au-stats::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .au-stats-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; text-align: center;
        }
        .au-stat-card {
          padding: 32px 16px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: transform 0.25s ease, background 0.25s;
        }
        .au-stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.15);
        }
        .au-stat-num {
          font-size: 42px; font-weight: 800; color: #fff;
          letter-spacing: -0.04em; line-height: 1;
          margin-bottom: 8px; display: block;
        }
        .au-stat-label {
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.75); text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── Offers ── */
        .au-offers {
          padding: 96px 0;
          background: var(--bg);
        }
        .au-offers-header {
          text-align: center; margin-bottom: 56px;
        }
        .au-offers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .au-offer-card {
          background: #fff;
          border: 2px solid var(--border);
          border-radius: 20px;
          padding: 36px 24px;
          text-align: center;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
          animation: au-scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .au-offer-card:hover {
          border-color: var(--blue-400);
          box-shadow: 0 12px 36px rgba(37,99,235,0.12);
          transform: translateY(-5px);
        }
        .au-offer-icon {
          width: 60px; height: 60px; border-radius: 18px;
          background: var(--blue-50); border: 2px solid var(--blue-100);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin: 0 auto 18px;
          transition: transform 0.25s, background 0.2s;
          animation: au-pulse 3s ease infinite;
        }
        .au-offer-card:hover .au-offer-icon {
          transform: scale(1.1) rotate(-5deg);
          background: var(--blue-100);
        }
        .au-offer-title {
          font-size: 16px; font-weight: 700; color: var(--ink); margin: 0 0 8px;
        }
        .au-offer-desc {
          font-size: 13px; font-weight: 500; color: var(--muted); line-height: 1.6; margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .au-mission-grid { grid-template-columns: 1fr; gap: 40px; }
          .au-offers-grid  { grid-template-columns: 1fr 1fr; }
          .au-stats-grid   { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .au-offers-grid { grid-template-columns: 1fr; }
          .au-stats-grid  { grid-template-columns: 1fr 1fr; }
          .au-hero { padding: 56px 0 48px; }
          .au-mission, .au-offers { padding: 64px 0; }
        }
      `}</style>

      <div className="au-root">
        {/* ══ HERO ══ */}
        <section className="au-hero">
          <div className="au-hero-orb au-hero-orb--1" />
          <div className="au-hero-orb au-hero-orb--2" />
          <Container maxWidth="lg" style={{ position: "relative", zIndex: 1 }}>
            <div className="au-hero-eyebrow">
              <span className="au-hero-eyebrow-line" />
              Our Story
              <span className="au-hero-eyebrow-line" />
            </div>
            <h1 className="au-hero-title">
              About <span>Our Company</span>
            </h1>
            <p className="au-hero-sub">
              Your trusted partner for premium pet care products and accessories
            </p>
          </Container>
        </section>

        {/* ══ MISSION ══ */}
        <section className="au-mission">
          <Container maxWidth="lg">
            <div className="au-mission-grid">
              {/* Copy */}
              <div
                ref={missionReveal.ref}
                className={`au-reveal-l${missionReveal.visible ? " show" : ""}`}
              >
                <div className="au-section-label">Our Mission</div>
                <h2 className="au-section-title">
                  Every pet deserves
                  <br />
                  the very best.
                </h2>
                <p className="au-mission-text">
                  We believe every pet deserves the best. Our mission is to
                  provide premium quality products that bring joy and comfort to
                  your furry friends.
                </p>
                <p className="au-mission-text">
                  From nutritious food to engaging toys and accessories, we
                  carefully select every product to enhance the bond between you
                  and your pet.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 28,
                    flexWrap: "wrap",
                  }}
                >
                  {["Vet Approved", "Eco Friendly", "Premium Care"].map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--blue-700)",
                          background: "var(--blue-50)",
                          border: "1.5px solid var(--blue-200)",
                          padding: "6px 14px",
                          borderRadius: 100,
                        }}
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Image */}
              <div
                className={`au-reveal-r${missionReveal.visible ? " show" : ""} au-mission-img-wrap`}
                style={{ animationDelay: "120ms" }}
              >
                <img src="/img/home-nav.png" alt="Happy pets" />
              </div>
            </div>
          </Container>
        </section>

        {/* ══ STATS ══ */}
        <section className="au-stats">
          <Container maxWidth="lg">
            <div
              ref={statsReveal.ref}
              className={`au-stats-grid${statsReveal.visible ? "" : ""}`}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="au-stat-card"
                  style={{
                    animation: statsReveal.visible
                      ? `au-fadeUp 0.55s ${i * 80}ms cubic-bezier(0.22,1,0.36,1) both`
                      : "none",
                    opacity: statsReveal.visible ? 1 : 0,
                  }}
                >
                  <span className="au-stat-num">
                    {statsReveal.visible ? (
                      <Counter target={s.value} suffix={s.suffix} />
                    ) : (
                      `0${s.suffix}`
                    )}
                  </span>
                  <span className="au-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ══ OFFERS ══ */}
        <section className="au-offers">
          <Container maxWidth="lg">
            <div
              ref={offersReveal.ref}
              className={`au-offers-header au-reveal${offersReveal.visible ? " show" : ""}`}
            >
              <div
                className="au-section-label"
                style={{ justifyContent: "center" }}
              >
                What We Offer
              </div>
              <h2 className="au-section-title">
                Everything your pet needs,
                <br />
                all in one place
              </h2>
            </div>

            <div className="au-offers-grid">
              {OFFERS.map((o, i) => (
                <div
                  key={o.title}
                  className="au-offer-card"
                  style={{
                    animationDelay: offersReveal.visible
                      ? `${i * 80}ms`
                      : "0ms",
                    opacity: offersReveal.visible ? 1 : 0,
                  }}
                >
                  <div
                    className="au-offer-icon"
                    style={{ animationDelay: `${i * 300}ms` }}
                  >
                    {o.icon}
                  </div>
                  <h3 className="au-offer-title">{o.title}</h3>
                  <p className="au-offer-desc">{o.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Address />
      </div>
    </>
  );
}
