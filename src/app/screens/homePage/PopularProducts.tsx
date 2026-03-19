import React, { useRef, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrievePopularProductts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const popularProductsRetriever = createSelector(
  retrievePopularProductts,
  (popularProducts) => ({ popularProducts }),
);

/* ─── Styles ─── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .pp-root, .pp-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .pp-root {
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
      --bg:       #F8FAFF;
    }

    @keyframes pp-fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pp-slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pp-pop {
      0%   { transform: scale(1); }
      40%  { transform: scale(1.22); }
      70%  { transform: scale(0.92); }
      100% { transform: scale(1); }
    }
    @keyframes pp-check {
      from { opacity: 0; transform: translateX(-4px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* ── Header ── */
    .pp-header {
      display: flex; align-items: flex-end; justify-content: space-between;
      margin-bottom: 32px;
      animation: pp-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .pp-eyebrow {
      display: flex; align-items: center; gap: 8px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
      text-transform: uppercase; color: var(--blue-600); margin-bottom: 8px;
    }
    .pp-eyebrow-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--blue-600);
    }
    .pp-heading {
      font-size: clamp(22px, 3vw, 32px); font-weight: 800;
      color: var(--ink); letter-spacing: -0.03em; margin: 0;
    }

    /* Scroll nav buttons */
    .pp-scroll-btns { display: flex; gap: 8px; }
    .pp-scroll-btn {
      width: 38px; height: 38px; border-radius: 12px;
      border: 2px solid var(--border); background: white;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: var(--muted);
      transition: all 0.18s ease;
    }
    .pp-scroll-btn:hover {
      border-color: var(--blue-500); color: var(--blue-600);
      background: var(--blue-50);
      transform: translateY(-1px);
    }

    /* ── Track ── */
    .pp-track {
      display: flex; gap: 20px;
      overflow-x: auto; padding-bottom: 12px;
      scroll-behavior: smooth;
      scrollbar-width: none;
    }
    .pp-track::-webkit-scrollbar { display: none; }

    /* ── Card ── */
    .pp-card {
      flex-shrink: 0;
      width: 248px;
      background: white;
      border: 2px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      animation: pp-slideIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
      transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
    }
    .pp-card:hover {
      border-color: var(--blue-300, #93c5fd);
      box-shadow: 0 16px 48px rgba(37,99,235,0.14);
      transform: translateY(-5px);
    }

    /* Image area */
    .pp-img-wrap {
      position: relative;
      width: 100%; height: 200px;
      overflow: hidden;
      background: var(--blue-50);
    }
    .pp-img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.55s cubic-bezier(0.23,1,0.32,1);
    }
    .pp-card:hover .pp-img { transform: scale(1.07); }

    /* Category badge */
    .pp-badge {
      position: absolute; top: 10px; left: 10px;
      background: var(--blue-600); color: white;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      padding: 4px 10px; border-radius: 100px; text-transform: uppercase;
      box-shadow: 0 3px 10px rgba(37,99,235,0.38);
    }

    /* View count — shows on hover */
    .pp-views {
      position: absolute; top: 10px; right: 10px;
      background: rgba(255,255,255,0.92); backdrop-filter: blur(6px);
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; color: var(--muted);
      padding: 4px 10px; border-radius: 100px;
      opacity: 0; transition: opacity 0.22s;
    }
    .pp-card:hover .pp-views { opacity: 1; }

    /* Bottom stripe */
    .pp-stripe {
      height: 3px;
      background: linear-gradient(90deg, var(--blue-600), var(--blue-400));
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
    }
    .pp-card:hover .pp-stripe { transform: scaleX(1); }

    /* Body */
    .pp-body { padding: 14px 16px 16px; }
    .pp-name {
      font-size: 14px; font-weight: 700; color: var(--ink);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      margin: 0 0 12px;
    }
    .pp-bottom {
      display: flex; align-items: center; justify-content: space-between;
    }
    .pp-price {
      font-size: 20px; font-weight: 800;
      color: var(--blue-600); letter-spacing: -0.02em;
    }

    /* Add button */
    .pp-add-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 7px 14px; border-radius: 100px;
      border: none; background: var(--blue-600); color: white;
      font-size: 12px; font-weight: 700; cursor: pointer;
      opacity: 0; transform: translateY(6px);
      transition: opacity 0.22s, transform 0.22s, background 0.18s;
      box-shadow: 0 4px 12px rgba(37,99,235,0.32);
    }
    .pp-card:hover .pp-add-btn { opacity: 1; transform: translateY(0); }
    .pp-add-btn:hover { background: var(--blue-700); }
    .pp-add-btn:active { animation: pp-pop 0.3s ease; }
    .pp-add-btn.added { background: #22c55e; box-shadow: 0 4px 12px rgba(34,197,94,0.35); }
    .pp-added-check { animation: pp-check 0.25s ease both; }

    /* Empty state */
    .pp-empty {
      width: 100%; text-align: center; padding: 64px 0;
      animation: pp-fadeUp 0.5s ease both;
    }
    .pp-empty-icon {
      width: 72px; height: 72px; border-radius: 22px;
      background: var(--blue-50); border: 2px solid var(--blue-100);
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; margin: 0 auto 16px;
    }
    .pp-empty-title { font-size: 17px; font-weight: 700; color: var(--ink); margin: 0 0 6px; }
    .pp-empty-sub   { font-size: 14px; font-weight: 500; color: var(--muted); margin: 0; }
  `}</style>
);

/* ─── Card component with add-to-cart state ─── */
function ProductCard({ product, delay }: { product: Product; delay: number }) {
  const [added, setAdded] = useState(false);
  const imagePath = `${serverApi}/${product.productImages[0]}`;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="pp-card" style={{ animationDelay: `${delay}ms` }}>
      {/* Image */}
      <div className="pp-img-wrap">
        <img src={imagePath} alt={product.productName} className="pp-img" />
        <span className="pp-badge">{product.productCollection}</span>
        <span className="pp-views">
          <VisibilityIcon style={{ fontSize: 13 }} />
          {product.productViews}
        </span>
      </div>

      {/* Stripe */}
      <div className="pp-stripe" />

      {/* Body */}
      <div className="pp-body">
        <p className="pp-name">{product.productName}</p>
        <div className="pp-bottom">
          <span className="pp-price">${product.productPrice}</span>
          <button
            className={`pp-add-btn${added ? " added" : ""}`}
            onClick={handleAdd}
          >
            {added ? (
              <span className="pp-added-check">✓ Added</span>
            ) : (
              <>
                <ShoppingCartOutlinedIcon style={{ fontSize: 15 }} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function PopularProducts() {
  const { popularProducts } = useSelector(popularProductsRetriever);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  return (
    <div className="pp-root" style={{ padding: "72px 24px" }}>
      <Styles />
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        {/* Header */}
        <div className="pp-header">
          <div>
            <div className="pp-eyebrow">
              <span className="pp-eyebrow-dot" />
              Trending Now
            </div>
            <h2 className="pp-heading">Popular Products</h2>
          </div>

          {popularProducts.length > 0 && (
            <div className="pp-scroll-btns">
              <button className="pp-scroll-btn" onClick={() => scroll("left")}>
                <ArrowBackIcon style={{ fontSize: 18 }} />
              </button>
              <button className="pp-scroll-btn" onClick={() => scroll("right")}>
                <ArrowForwardIcon style={{ fontSize: 18 }} />
              </button>
            </div>
          )}
        </div>

        {/* Track */}
        {popularProducts.length > 0 ? (
          <div className="pp-track" ref={trackRef}>
            {popularProducts.map((product: Product, i: number) => (
              <ProductCard key={product._id} product={product} delay={i * 70} />
            ))}
          </div>
        ) : (
          <div className="pp-empty">
            <div className="pp-empty-icon">🐾</div>
            <p className="pp-empty-title">No popular products yet</p>
            <p className="pp-empty-sub">Check back soon for trending items!</p>
          </div>
        )}
      </div>
    </div>
  );
}
