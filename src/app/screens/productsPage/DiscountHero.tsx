import React from "react";
import { useHistory } from "react-router-dom";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .dh-root, .dh-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }

    @keyframes dh-fadeLeft {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes dh-fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes dh-imgUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes dh-float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }

    .dh-wrap {
      position: relative;
      overflow: hidden;
      border-radius: 32px;
      background: #EFF6FF;
      border: 2px solid #BFDBFE;
      min-height: 340px;
      display: flex;
      align-items: stretch;
    }

    .dh-wrap::before {
      content: '';
      position: absolute; inset: 0;
      background-image: radial-gradient(circle, #3B82F618 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
    }

    .dh-panel {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 54%;
      background: #062E4F;
      border-radius: 28px;
    }
    .dh-panel::before {
      content: '';
      position: absolute;
      width: 320px; height: 320px; border-radius: 50%;
      background: rgba(255,255,255,0.03);
      top: -80px; right: -60px;
    }
    .dh-panel::after {
      content: '';
      position: absolute;
      width: 180px; height: 180px; border-radius: 50%;
      background: rgba(255,255,255,0.04);
      bottom: -40px; left: 40px;
    }

    .dh-img-col {
      position: relative;
      width: 46%;
      flex-shrink: 0;
      display: flex;
      align-items: flex-end;
      padding: 0 0 0 40px;
      z-index: 2;
    }
    .dh-img {
      max-height: 300px;
      object-fit: contain;
      display: block;

      filter: drop-shadow(0 16px 28px rgba(6,46,79,0.18));
    }

    .dh-badge {
      position: absolute;
      top: 28px; right: 0;
      background: #fff;
      color: #062E4F;
      font-size: 11px; font-weight: 800;
      padding: 6px 16px; border-radius: 100px 0 0 100px;
      letter-spacing: 0.06em; text-transform: uppercase;
      box-shadow: 0 4px 14px rgba(37,99,235,0.15);
      animation: dh-fadeUp 0.5s 0.4s ease both;
    }

    .dh-content {
      flex: 1;
      padding: 44px 44px 44px 36px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 2;
    }

    .dh-eyebrow {
      display: inline-flex; align-items: center; gap: 7px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
      text-transform: uppercase; color: #93C5FD;
      margin-bottom: 12px;
      animation: dh-fadeLeft 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both;
    }
    .dh-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: #93C5FD; }

    .dh-title {
      font-size: clamp(26px, 3vw, 42px);
      font-weight: 800; color: #fff;
      line-height: 1.1; letter-spacing: -0.03em;
      margin: 0 0 12px;
      animation: dh-fadeLeft 0.5s 0.18s cubic-bezier(0.22,1,0.36,1) both;
    }
    .dh-title span { color: #fff; opacity: 0.85; }

    .dh-sub {
      font-size: 15px; font-weight: 500;
      color: rgba(255,255,255,0.55);
      line-height: 1.65; margin: 0 0 28px;
      max-width: 340px;
      animation: dh-fadeLeft 0.5s 0.26s cubic-bezier(0.22,1,0.36,1) both;
    }

    .dh-btns {
      display: flex; gap: 12px; flex-wrap: wrap;
      animation: dh-fadeUp 0.5s 0.34s cubic-bezier(0.22,1,0.36,1) both;
    }

    .dh-btn-primary {
      padding: 12px 28px; border-radius: 100px;
      background: #fff; color: #062E4F;
      border: none; font-size: 14px; font-weight: 800;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(255,255,255,0.2);
      transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
    }
    .dh-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 26px rgba(255,255,255,0.28);
      opacity: 0.93;
    }

    .dh-btn-secondary {
      padding: 12px 24px; border-radius: 100px;
      background: transparent;
      border: 2px solid rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.75);
      font-size: 14px; font-weight: 700;
      cursor: pointer;
      transition: border-color 0.18s, background 0.18s, transform 0.18s;
    }
    .dh-btn-secondary:hover {
      border-color: rgba(255,255,255,0.5);
      background: rgba(255,255,255,0.07);
      transform: translateY(-2px);
    }

    .dh-stats {
      display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap;
      animation: dh-fadeUp 0.5s 0.42s cubic-bezier(0.22,1,0.36,1) both;
    }
    .dh-stat {
      display: flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 5px 12px; border-radius: 100px;
    }
    .dh-stat-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; }
    .dh-stat-text { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.6); }
  `}</style>
);

export default function DiscountHero() {
  const history = useHistory();

  return (
    <section className="dh-root" style={{ padding: "32px 24px 0" }}>
      <Styles />
      <div style={{ maxWidth: 1340, margin: "0 auto" }}>
        <div className="dh-wrap">
          <div className="dh-panel" />

          <div className="dh-img-col">
            <span className="dh-badge">🚚 Free Delivery</span>
            <img src="/img/products-dogs.png" alt="Pets" className="dh-img" />
          </div>

          <div className="dh-content">
            <div className="dh-eyebrow">
              <span className="dh-eyebrow-dot" />
              Limited Time Offer
            </div>

            <h2 className="dh-title">
              Launch Offer —<br />
              orders over <span>$49.99</span>
            </h2>

            <p className="dh-sub">
              Limited-time deal! Enjoy fast delivery and premium products for
              your beloved pets.
            </p>

            <div className="dh-btns">
              <button
                className="dh-btn-primary"
                onClick={() => history.push("/products")}
              >
                Shop Now
              </button>
              <button className="dh-btn-secondary">View Details</button>
            </div>

            <div className="dh-stats">
              {["Free returns", "Vet approved", "Same-day dispatch"].map(
                (s) => (
                  <div key={s} className="dh-stat">
                    <span className="dh-stat-dot" />
                    <span className="dh-stat-text">{s}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
