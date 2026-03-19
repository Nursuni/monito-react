import React, { useRef, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { retrieveNewProducts } from "./selector";
import { ProductCollection } from "../../../lib/enums/product.enum";

const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({ newProducts }),
);

/* ─── Styles (identical token set to PopularProducts) ─── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .np-root, .np-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .np-root {
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

    @keyframes np-fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes np-slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes np-pop {
      0%   { transform: scale(1); }
      40%  { transform: scale(1.22); }
      70%  { transform: scale(0.92); }
      100% { transform: scale(1); }
    }
    @keyframes np-check {
      from { opacity: 0; transform: translateX(-4px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* ── Header ── */
    .np-header {
      display: flex; align-items: flex-end; justify-content: space-between;
      margin-bottom: 32px;
      animation: np-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .np-eyebrow {
      display: flex; align-items: center; gap: 8px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
      text-transform: uppercase; color: var(--blue-600); margin-bottom: 8px;
    }
    .np-eyebrow-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--blue-600);
    }
    .np-heading {
      font-size: clamp(22px, 3vw, 32px); font-weight: 800;
      color: var(--ink); letter-spacing: -0.03em; margin: 0;
    }

    /* View all button */
    .np-view-all {
      display: flex; align-items: center; gap: 6px;
      padding: 9px 20px; border-radius: 100px;
      border: 2px solid var(--border); background: white;
      font-size: 13px; font-weight: 700; color: var(--muted);
      cursor: pointer; transition: all 0.18s ease;
      text-decoration: none;
    }
    .np-view-all:hover {
      border-color: var(--blue-500); color: var(--blue-600);
      background: var(--blue-50); transform: translateY(-1px);
    }

    /* Scroll nav buttons */
    .np-scroll-btns { display: flex; gap: 8px; }
    .np-scroll-btn {
      width: 38px; height: 38px; border-radius: 12px;
      border: 2px solid var(--border); background: white;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: var(--muted);
      transition: all 0.18s ease;
    }
    .np-scroll-btn:hover {
      border-color: var(--blue-500); color: var(--blue-600);
      background: var(--blue-50); transform: translateY(-1px);
    }

    /* ── Track ── */
    .np-track {
      display: flex; gap: 20px;
      overflow-x: auto; padding-bottom: 12px;
      scroll-behavior: smooth; scrollbar-width: none;
      height: 340px; align-items: stretch;
    }
    .np-track::-webkit-scrollbar { display: none; }

    /* ── Card ── */
    .np-card {
      flex-shrink: 0; width: 248px;
      background: white; border: 2px solid var(--border);
      border-radius: 20px; overflow: hidden; cursor: pointer;
      animation: np-slideIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
      transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
    }
    .np-card:hover {
      border-color: var(--blue-200);
      box-shadow: 0 16px 48px rgba(37,99,235,0.14);
      transform: translateY(-5px);
    }

    /* Image */
    .np-img-wrap {
      position: relative; width: 100%; height: 200px;
      overflow: hidden; background: var(--blue-50);
    }
    .np-img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.55s cubic-bezier(0.23,1,0.32,1);
    }
    .np-card:hover .np-img { transform: scale(1.07); }

    /* Badges */
    .np-badge-collection {
      position: absolute; top: 10px; left: 10px;
      background: var(--blue-600); color: white;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      padding: 4px 10px; border-radius: 100px; text-transform: uppercase;
      box-shadow: 0 3px 10px rgba(37,99,235,0.38);
    }
    .np-badge-size {
      position: absolute; top: 10px; right: 10px;
      background: rgba(255,255,255,0.92); backdrop-filter: blur(6px);
      font-size: 11px; font-weight: 700; color: var(--ink);
      padding: 4px 10px; border-radius: 100px;
      border: 1.5px solid var(--border);
    }

    /* NEW ribbon */
    .np-new-ribbon {
      position: absolute; bottom: 10px; left: 10px;
      background: #22c55e; color: white;
      font-size: 10px; font-weight: 800; letter-spacing: 0.1em;
      padding: 3px 9px; border-radius: 100px; text-transform: uppercase;
    }

    /* View count */
    .np-views {
      position: absolute; bottom: 10px; right: 10px;
      background: rgba(255,255,255,0.92); backdrop-filter: blur(6px);
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; color: var(--muted);
      padding: 4px 10px; border-radius: 100px;
      opacity: 0; transition: opacity 0.22s;
    }
    .np-card:hover .np-views { opacity: 1; }

    /* Bottom stripe */
    .np-stripe {
      height: 3px;
      background: linear-gradient(90deg, var(--blue-600), var(--blue-400));
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
    }
    .np-card:hover .np-stripe { transform: scaleX(1); }

    /* Body */
    .np-body { padding: 14px 16px 16px; }
    .np-name {
      font-size: 14px; font-weight: 700; color: var(--ink);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      margin: 0 0 12px;
    }
    .np-bottom {
      display: flex; align-items: center; justify-content: space-between;
    }
    .np-price {
      font-size: 20px; font-weight: 800;
      color: var(--blue-600); letter-spacing: -0.02em;
    }

    /* Add button */
    .np-add-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 7px 14px; border-radius: 100px;
      border: none; background: var(--blue-600); color: white;
      font-size: 12px; font-weight: 700; cursor: pointer;
      opacity: 0; transform: translateY(6px);
      transition: opacity 0.22s, transform 0.22s, background 0.18s;
      box-shadow: 0 4px 12px rgba(37,99,235,0.32);
    }
    .np-card:hover .np-add-btn { opacity: 1; transform: translateY(0); }
    .np-add-btn:hover { background: var(--blue-700); }
    .np-add-btn:active { animation: np-pop 0.3s ease; }
    .np-add-btn.added { background: #22c55e; box-shadow: 0 4px 12px rgba(34,197,94,0.35); }
    .np-added-check { animation: np-check 0.25s ease both; }

    /* Empty */
    .np-empty {
      width: 100%; text-align: center; padding: 64px 0;
      animation: np-fadeUp 0.5s ease both;
    }
    .np-empty-icon {
      width: 72px; height: 72px; border-radius: 22px;
      background: var(--blue-50); border: 2px solid var(--blue-100);
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; margin: 0 auto 16px;
    }
    .np-empty-title { font-size: 17px; font-weight: 700; color: var(--ink); margin: 0 0 6px; }
    .np-empty-sub   { font-size: 14px; font-weight: 500; color: var(--muted); margin: 0; }
  `}</style>
);

/* ─── Card ─── */
function NewProductCard({
  product,
  delay,
}: {
  product: Product;
  delay: number;
}) {
  const [added, setAdded] = useState(false);
  const imagePath = `${serverApi}/${product.productImages[0]}`;
  const sizeVolume =
    product.productCollection === ProductCollection.DRINK
      ? product.productVolume + "l"
      : product.productSize;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="np-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="np-img-wrap">
        <img src={imagePath} alt={product.productName} className="np-img" />
        <span className="np-badge-collection">{product.productCollection}</span>
        {sizeVolume && <span className="np-badge-size">{sizeVolume}</span>}
        <span className="np-new-ribbon">New</span>
        <span className="np-views">
          <VisibilityIcon style={{ fontSize: 13 }} />
          {product.productViews}
        </span>
      </div>

      <div className="np-stripe" />

      <div className="np-body">
        <p className="np-name">{product.productName}</p>
        <div className="np-bottom">
          <span className="np-price">${product.productPrice}</span>
          <button
            className={`np-add-btn${added ? " added" : ""}`}
            onClick={handleAdd}
          >
            {added ? (
              <span className="np-added-check">✓ Added</span>
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
export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  return (
    <div className="np-root" style={{ padding: "72px 24px" }}>
      <Styles />
      <div style={{ maxWidth: 1340, margin: "0 auto" }}>
        {/* Header */}
        <div className="np-header">
          <div>
            <div className="np-eyebrow">
              <span className="np-eyebrow-dot" />
              New Arrivals
            </div>
            <h2 className="np-heading">Discover Our Latest Products</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/products" className="np-view-all">
              View All
              <ArrowForwardIcon style={{ fontSize: 15 }} />
            </a>
            {newProducts.length > 0 && (
              <div className="np-scroll-btns">
                <button
                  className="np-scroll-btn"
                  onClick={() => scroll("left")}
                >
                  <ArrowBackIcon style={{ fontSize: 18 }} />
                </button>
                <button
                  className="np-scroll-btn"
                  onClick={() => scroll("right")}
                >
                  <ArrowForwardIcon style={{ fontSize: 18 }} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Track */}
        {newProducts.length > 0 ? (
          <div className="np-track" ref={trackRef}>
            {newProducts.map((product: Product, i: number) => (
              <NewProductCard
                key={product._id}
                product={product}
                delay={i * 70}
              />
            ))}
          </div>
        ) : (
          <div className="np-empty">
            <div className="pp-empty-icon">🐾</div>
            <p className="np-empty-title">No new products yet</p>
            <p className="np-empty-sub">Check back soon for fresh arrivals!</p>
          </div>
        )}
      </div>
    </div>
  );
}
