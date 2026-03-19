import React, { useState } from "react";
import { Link } from "react-router-dom";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .ft-root, .ft-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .ft-root {
      --blue-50:  #EFF6FF;
      --blue-100: #DBEAFE;
      --blue-200: #BFDBFE;
      --blue-400: #60A5FA;
      --blue-500: #3B82F6;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
      --ink:      #0F172A;
      --muted:    #64748B;
      --border:   #E2E8F0;
    }

    @keyframes ft-fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes ft-pop {
      0%   { transform: scale(1); }
      40%  { transform: scale(1.18); }
      100% { transform: scale(1); }
    }
    @keyframes ft-check {
      from { opacity: 0; transform: translateX(-4px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* Wrapper */
    .ft-wrap {
      background: var(--ink);
      padding: 72px 24px 0;
      animation: ft-fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
    }
    .ft-inner {
      max-width: 1300px;
      margin: 0 auto;
    }

    /* Grid */
    .ft-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
      gap: 48px;
      padding-bottom: 56px;
    }

    /* Brand col */
    .ft-logo { height: 36px; width: auto; display: block; margin-bottom: 16px; filter: brightness(0) invert(1); }
    .ft-tagline {
      font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.55);
      line-height: 1.7; margin: 0 0 24px;
    }

    /* Social icons */
    .ft-socials { display: flex; gap: 10px; }
    .ft-social-btn {
      width: 36px; height: 36px; border-radius: 10px;
      border: 1.5px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.18s ease;
    }
    .ft-social-btn:hover {
      background: var(--blue-600);
      border-color: var(--blue-600);
      transform: translateY(-2px);
    }
    .ft-social-btn img { width: 16px; height: 16px; filter: brightness(0) invert(1); }

    /* Column title */
    .ft-col-title {
      font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
      text-transform: uppercase; color: rgba(255,255,255,0.4);
      margin: 0 0 18px; display: block;
    }

    /* Links */
    .ft-links { display: flex; flex-direction: column; gap: 10px; }
    .ft-link {
      font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.65);
      text-decoration: none; transition: color 0.18s, transform 0.18s;
      display: inline-block;
    }
    .ft-link:hover { color: #fff; transform: translateX(3px); }

    /* Newsletter */
    .ft-newsletter-text {
      font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.55);
      line-height: 1.6; margin: 0 0 16px;
    }
    .ft-email-row { display: flex; gap: 8px; }
    .ft-email-input {
      flex: 1; padding: 11px 14px;
      border-radius: 12px; border: 1.5px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.07); color: #fff;
      font-size: 13px; font-weight: 500; outline: none;
      transition: border-color 0.2s, background 0.2s;
    }
    .ft-email-input::placeholder { color: rgba(255,255,255,0.3); }
    .ft-email-input:focus {
      border-color: var(--blue-500);
      background: rgba(255,255,255,0.1);
    }
    .ft-sub-btn {
      padding: 11px 18px; border-radius: 12px;
      border: none; background: var(--blue-600); color: #fff;
      font-size: 13px; font-weight: 700; cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 4px 14px rgba(37,99,235,0.35);
      transition: background 0.18s, transform 0.18s;
    }
    .ft-sub-btn:hover { background: var(--blue-700); transform: translateY(-1px); }
    .ft-sub-btn.done { background: #22c55e; box-shadow: 0 4px 14px rgba(34,197,94,0.3); }
    .ft-sub-btn.done span { animation: ft-check 0.25s ease both; }
    .ft-sub-hint {
      font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.3);
      margin: 10px 0 0;
    }

    /* Divider */
    .ft-divider {
      height: 1px; background: rgba(255,255,255,0.08); margin: 0;
    }

    /* Bottom bar */
    .ft-bottom {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 0 24px; flex-wrap: wrap; gap: 12px;
    }
    .ft-copy {
      font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.35);
    }
    .ft-bottom-links { display: flex; gap: 20px; }
    .ft-bottom-link {
      font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.35);
      text-decoration: none; transition: color 0.18s;
    }
    .ft-bottom-link:hover { color: rgba(255,255,255,0.7); }

    /* Blue accent top border */
    .ft-accent-bar {
      height: 3px;
      background: linear-gradient(90deg, var(--blue-600), var(--blue-400), var(--blue-200));
    }

    @media (max-width: 960px) {
      .ft-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
    }
    @media (max-width: 600px) {
      .ft-grid { grid-template-columns: 1fr; }
      .ft-bottom { flex-direction: column; align-items: flex-start; }
    }
  `}</style>
);

const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
  { label: "About Us", path: "/aboutus" },
  { label: "Help", path: "/help" },
];

const SERVICE_LINKS = [
  { label: "Shipping Info", path: "/shipping" },
  { label: "Returns", path: "/returns" },
  { label: "Track Order", path: "/track" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms & Conditions", path: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubDone(true);
    setEmail("");
    setTimeout(() => setSubDone(false), 3000);
  };

  return (
    <footer className="ft-root">
      <Styles />
      <div className="ft-accent-bar" />

      <div className="ft-wrap">
        <div className="ft-inner">
          <div className="ft-grid">
            {/* ── Brand ── */}
            <div>
              <img src="/icons/frame.svg" alt="Logo" className="ft-logo" />
              <p className="ft-tagline">
                Your one-stop shop for all your pet needs.
                <br />
                Quality products for happy, healthy pets.
              </p>
              <div className="ft-socials">
                {["facebook", "twitter", "instagram", "youtube"].map((s) => (
                  <button key={s} className="ft-social-btn">
                    <img src={`/icons/${s}.svg`} alt={s} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <span className="ft-col-title">Quick Links</span>
              <div className="ft-links">
                {QUICK_LINKS.map((l) => (
                  <Link key={l.path} to={l.path} className="ft-link">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Services ── */}
            <div>
              <span className="ft-col-title">Services</span>
              <div className="ft-links">
                {SERVICE_LINKS.map((l) => (
                  <Link key={l.path} to={l.path} className="ft-link">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Newsletter ── */}
            <div>
              <span className="ft-col-title">Newsletter</span>
              <p className="ft-newsletter-text">
                Subscribe to get special offers, free giveaways, and new arrival
                updates.
              </p>
              <div className="ft-email-row">
                <input
                  className="ft-email-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <button
                  className={`ft-sub-btn${subDone ? " done" : ""}`}
                  onClick={handleSubscribe}
                >
                  {subDone ? <span>✓ Done</span> : "Subscribe"}
                </button>
              </div>
              <p className="ft-sub-hint">No spam, unsubscribe anytime.</p>
            </div>
          </div>

          <div className="ft-divider" />

          {/* Bottom bar */}
          <div className="ft-bottom">
            <span className="ft-copy">
              © 2025 Monito Pets Shop. All rights reserved.
            </span>
            <div className="ft-bottom-links">
              <Link to="/privacy" className="ft-bottom-link">
                Privacy
              </Link>
              <Link to="/terms" className="ft-bottom-link">
                Terms
              </Link>
              <Link to="/help" className="ft-bottom-link">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
