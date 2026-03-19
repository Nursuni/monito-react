import React from "react";

type Review = {
  name: string;
  text: string;
  avatar: string;
};

const reviews: Review[] = [
  {
    name: "Sarah Johnson",
    text: "I love shopping at Monito! The pet food quality is excellent and my dog absolutely loves it. Fast delivery and great packaging.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    text: "Monito has the best selection of pet toys and accessories. Prices are reasonable and everything arrived exactly as described.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Rodriguez",
    text: "The customer service is amazing. I ordered supplies for my rescue dog and everything was high quality and affordable.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Wilson",
    text: "I regularly buy food and supplements from Monito. The products are authentic and my senior dog is doing great.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Jessica Taylor",
    text: "Monito is my go-to pet shop online. Delivery is fast and the product descriptions are very accurate.",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    name: "Robert Thompson",
    text: "Great quality pet products and very reliable service. Monito made it easy to keep my lab healthy and happy.",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
  },
];

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .rv-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      box-sizing: border-box;
      --blue-50:  #EFF6FF;
      --blue-100: #DBEAFE;
      --blue-200: #BFDBFE;
      --blue-400: #60A5FA;
      --blue-500: #3B82F6;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
      --blue-900: #1E3A8A;
      --ink:      #0F172A;
      --muted:    #64748B;
    }

    .rv-root * { box-sizing: border-box; }

    /* Section */
    .rv-section {
      background: linear-gradient(160deg, #f0f7ff 0%, #ffffff 50%, #eff6ff 100%);
      padding: 96px 24px;
      position: relative;
      overflow: hidden;
    }

    /* Decorative blobs */
    .rv-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      opacity: 0.35;
    }
    .rv-blob-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, #bfdbfe, transparent 70%);
      top: -150px; left: -100px;
    }
    .rv-blob-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, #dbeafe, transparent 70%);
      bottom: -100px; right: -80px;
    }

    .rv-inner {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    /* Header */
    .rv-header {
      text-align: center;
      margin-bottom: 64px;
    }
    .rv-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--blue-50);
      border: 1.5px solid var(--blue-200);
      border-radius: 999px;
      padding: 5px 14px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--blue-600);
      margin-bottom: 16px;
    }
    .rv-eyebrow-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--blue-500);
    }
    .rv-heading {
      font-size: clamp(26px, 4vw, 40px);
      font-weight: 800;
      color: var(--ink);
      letter-spacing: -0.03em;
      margin: 0 0 12px;
    }
    .rv-heading span {
      color: var(--blue-600);
    }
    .rv-sub {
      font-size: 15px;
      color: var(--muted);
      max-width: 480px;
      margin: 0 auto;
      line-height: 1.65;
    }

    /* Grid */
    .rv-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    @media (max-width: 900px) {
      .rv-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 580px) {
      .rv-grid { grid-template-columns: 1fr; }
    }

    /* Card */
    .rv-card {
      background: white;
      border: 1.5px solid var(--blue-100);
      border-radius: 20px;
      padding: 28px;
      position: relative;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      overflow: hidden;
    }
    .rv-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--blue-500), var(--blue-400));
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .rv-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 48px rgba(37, 99, 235, 0.12);
      border-color: var(--blue-200);
    }
    .rv-card:hover::before {
      opacity: 1;
    }

    /* Quote mark */
    .rv-quote {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: var(--blue-50);
      border: 1.5px solid var(--blue-100);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 16px;
    }
    .rv-quote svg {
      width: 16px; height: 16px;
      fill: var(--blue-500);
    }

    /* Stars */
    .rv-stars {
      display: flex;
      gap: 3px;
      margin-bottom: 14px;
    }
    .rv-star {
      font-size: 13px;
    }

    /* Text */
    .rv-text {
      font-size: 14px;
      line-height: 1.7;
      color: #475569;
      margin: 0 0 24px;
    }

    /* Divider */
    .rv-divider {
      height: 1px;
      background: var(--blue-100);
      margin-bottom: 20px;
    }

    /* Author */
    .rv-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .rv-avatar-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .rv-avatar {
      width: 40px; height: 40px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--blue-100);
      display: block;
    }
    .rv-avatar-ring {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid transparent;
      background: linear-gradient(white, white) padding-box,
                  linear-gradient(135deg, var(--blue-500), var(--blue-300)) border-box;
      transition: opacity 0.25s;
      opacity: 0;
    }
    .rv-card:hover .rv-avatar-ring { opacity: 1; }

    .rv-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--ink);
      margin: 0 0 2px;
    }
    .rv-badge {
      font-size: 11px;
      font-weight: 600;
      color: var(--blue-500);
      letter-spacing: 0.04em;
    }
  `}</style>
);

export default function Reviews() {
  return (
    <div className="rv-root">
      <Styles />
      <section className="rv-section">
        <div className="rv-blob rv-blob-1" />
        <div className="rv-blob rv-blob-2" />

        <div className="rv-inner">
          {/* Header */}
          <div className="rv-header">
            <div className="rv-eyebrow">
              <span className="rv-eyebrow-dot" />
              Customer Reviews
            </div>
            <h2 className="rv-heading">
              Trusted by <span>Pet Lovers</span>
            </h2>
            <p className="rv-sub">
              See what our customers say about shopping pet products at Monito.
            </p>
          </div>

          {/* Cards */}
          <div className="rv-grid">
            {reviews.map((review, i) => (
              <div key={i} className="rv-card">
                {/* Quote icon */}
                <div className="rv-quote">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.95.76-3 .66-1.06 1.5-1.89 2.55-2.5l-1.16-1.5c-1.31.74-2.43 1.82-3.37 3.24C5.4 10.37 5 11.85 5 13.4c0 1.52.47 2.75 1.4 3.68C7.34 18.02 8.5 18.5 9.88 18.5c1.28 0 2.3-.4 3.07-1.2.76-.8 1.14-1.78 1.14-2.96l-2.9.417zm8.808 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.695-1.327-.825-.57-.13-1.08-.136-1.54-.022-.16-.95.1-1.95.76-3 .66-1.06 1.5-1.89 2.55-2.5l-1.16-1.5c-1.31.74-2.43 1.82-3.37 3.24-.97 1.42-1.37 2.9-1.37 4.45 0 1.52.47 2.75 1.4 3.68.94.93 2.1 1.41 3.48 1.41 1.28 0 2.3-.4 3.07-1.2.76-.8 1.14-1.78 1.14-2.96l-2.9.417z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="rv-stars">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="rv-star">
                      ⭐
                    </span>
                  ))}
                </div>

                <p className="rv-text">{review.text}</p>

                <div className="rv-divider" />

                <div className="rv-author">
                  <div className="rv-avatar-wrap">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="rv-avatar"
                    />
                    <div className="rv-avatar-ring" />
                  </div>
                  <div>
                    <p className="rv-name">{review.name}</p>
                    <span className="rv-badge">Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
