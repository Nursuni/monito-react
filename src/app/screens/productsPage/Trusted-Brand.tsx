import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .ss-root, .ss-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .ss-root {
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

    @keyframes ss-fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes marqueeScroll {
      0%   { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }

    .ss-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 32px;
      animation: ss-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }

    .ss-eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--blue-600);
      margin-bottom: 8px;
    }
    .ss-eyebrow-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--blue-600);
    }
    .ss-heading {
      font-size: clamp(22px, 3vw, 32px);
      font-weight: 800;
      color: var(--ink);
      letter-spacing: -0.03em;
      margin: 0;
    }

    .ss-view-all {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 9px 20px;
      border-radius: 100px;
      border: 2px solid var(--border);
      background: white;
      font-size: 13px;
      font-weight: 700;
      color: var(--muted);
      cursor: pointer;
      transition: all 0.18s ease;
      text-decoration: none;
      white-space: nowrap;
    }
    .ss-view-all:hover {
      border-color: var(--blue-500);
      color: var(--blue-600);
      background: var(--blue-50);
      transform: translateY(-1px);
    }

    /* Marquee */
    .ss-marquee-wrap {
      position: relative;
      overflow: hidden;
      width: 100%;
      select-none: none;
      padding: 8px 0;
    }
    .ss-fade-left {
      position: absolute; left: 0; top: 0; height: 100%; width: 80px;
      background: linear-gradient(to right, white, transparent);
      z-index: 10; pointer-events: none;
    }
    .ss-fade-right {
      position: absolute; right: 0; top: 0; height: 100%; width: 80px;
      background: linear-gradient(to left, white, transparent);
      z-index: 10; pointer-events: none;
    }
    .ss-marquee-inner {
      display: flex;
      min-width: 200%;
      will-change: transform;
      animation: marqueeScroll 15s linear infinite;
    }
    .ss-logo-track {
      display: flex;
      align-items: center;
    }
    .ss-logo {
      height: 64px;
      object-fit: contain;
      margin: 0 24px;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .ss-logo:hover { opacity: 1; }
  `}</style>
);

const MarqueeLogos = () => {
  const companyLogos = [
    "sheba",
    "whiskas",
    "bakers",
    "felix",
    "goodboy",
    "bakers",
    "butcher",
    "pedigree",
  ];

  return (
    <div className="ss-marquee-wrap">
      <div className="ss-fade-left" />
      <div className="ss-marquee-inner">
        {[0, 1].map((pass) => (
          <div key={pass} className="ss-logo-track">
            {companyLogos.map((company, i) => (
              <img
                key={`${pass}-${i}`}
                src={`/img/logos/brand_${company}.svg`}
                alt={company}
                className="ss-logo"
                draggable={false}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="ss-fade-right" />
    </div>
  );
};

const SellersSection = () => {
  return (
    <div className="ss-root" style={{ padding: "72px 24px" }}>
      <Styles />
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        {/* Header — matches np-header */}
        <div className="ss-header">
          <div>
            <div className="ss-eyebrow">
              <span className="ss-eyebrow-dot" />
              Proud to be part of
            </div>
            <h2 className="ss-heading">Pet Sellers</h2>
          </div>

          <a href="/sellers" className="ss-view-all">
            View all our sellers <ArrowForwardIcon style={{ fontSize: 15 }} />
          </a>
        </div>

        {/* Marquee */}
        <MarqueeLogos />
      </div>
    </div>
  );
};

export default SellersSection;
