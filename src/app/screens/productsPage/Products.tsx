import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import DiscountHero from "./DiscountHero";

/* ─── Styles ─── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .pr-root, .pr-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .pr-root {
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
      min-height: 100vh;
      background: var(--bg);
    }

    /* ── Keyframes ── */
    @keyframes pr-fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pr-slideLeft {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pr-fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes pr-blob {
      0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    }
    @keyframes pr-cartPop {
      0%   { transform: scale(1); }
      40%  { transform: scale(1.28) rotate(-4deg); }
      70%  { transform: scale(0.92) rotate(2deg); }
      100% { transform: scale(1); }
    }
    @keyframes pr-checkSlide {
      from { opacity: 0; transform: translateX(-5px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pr-pulseRing {
      0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.5); }
      70%  { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
      100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
    }

    /* ── Layout ── */
    .pr-page        { max-width: 1340px; margin: 0 auto; padding: 0 24px 120px; }

    .pr-header      {
      padding: 48px 0 32px;
      display: flex; align-items: flex-end; justify-content: space-between;
      border-bottom: 2px solid var(--border); margin-bottom: 36px;
      animation: pr-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .pr-header-sub  { font-size: 15px; font-weight: 500; color: var(--muted); margin: 0; }

    .pr-layout      { display: grid; grid-template-columns: 260px 1fr; gap: 32px; align-items: start; }

    /* ── Sort pills ── */
    .pr-sort-row    { display: flex; gap: 8px; }
    .pr-sort-pill   {
      padding: 8px 18px; border-radius: 100px;
      border: 2px solid var(--border); background: transparent;
      font-size: 13px; font-weight: 600; color: var(--muted);
      cursor: pointer; transition: all 0.18s ease;
    }
    .pr-sort-pill:hover { border-color: var(--blue-400); color: var(--blue-600); }
    .pr-sort-pill.active {
      background: var(--blue-600); color: #fff; border-color: var(--blue-600);
      box-shadow: 0 4px 14px rgba(37,99,235,0.3);
    }

    /* ── Sidebar ── */
    .pr-sidebar {
      position: sticky; top: 24px;
      background: #fff; border-radius: 20px;
      border: 2px solid var(--border);
      box-shadow: 0 4px 20px rgba(37,99,235,0.06);
      overflow: hidden;
      animation: pr-slideLeft 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .pr-sidebar-bar { height: 4px; background: linear-gradient(90deg, var(--blue-600), var(--blue-400)); }
    .pr-sidebar-body { padding: 22px; }

    .pr-sidebar-title {
      display: flex; align-items: center; gap: 8px; margin-bottom: 20px;
    }
    .pr-sidebar-icon {
      width: 30px; height: 30px; border-radius: 9px;
      background: var(--blue-50); border: 2px solid var(--blue-200);
      display: flex; align-items: center; justify-content: center; font-size: 14px;
    }
    .pr-sidebar-label { font-size: 15px; font-weight: 800; color: var(--ink); }

    .pr-section-label {
      display: block; font-size: 10px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 9px;
    }
    .pr-divider { height: 1px; background: var(--border); margin: 18px 0; }

    /* Search row */
    .pr-search-row  { display: flex; gap: 6px; }
    .pr-input {
      flex: 1; border: 2px solid var(--border); border-radius: 12px;
      padding: 10px 14px; font-size: 13px; font-weight: 500;
      outline: none; background: var(--bg); color: var(--ink);
      transition: border-color 0.18s, box-shadow 0.18s;
    }
    .pr-input:focus       { border-color: var(--blue-500); box-shadow: 0 0 0 4px rgba(37,99,235,0.1); }
    .pr-input::placeholder { color: #CBD5E1; }

    .pr-go-btn {
      background: var(--blue-600); color: #fff;
      border: none; border-radius: 12px; padding: 0 14px;
      font-size: 13px; font-weight: 700; cursor: pointer;
      box-shadow: 0 4px 12px rgba(37,99,235,0.28);
      transition: background 0.18s;
    }
    .pr-go-btn:hover { background: var(--blue-700); }

    /* Pet pills */
    .pr-pet-list { display: flex; flex-direction: column; gap: 6px; }
    .pr-pet-pill {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 10px 13px; border-radius: 11px; border: 2px solid var(--border);
      background: #fff; cursor: pointer; font-size: 13px; font-weight: 600;
      color: var(--ink); text-align: left;
      transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    }
    .pr-pet-pill:hover   { border-color: var(--blue-400); background: var(--blue-50); transform: translateX(3px); }
    .pr-pet-pill.active  {
      background: var(--blue-600); color: #fff; border-color: var(--blue-600);
      box-shadow: 0 4px 14px rgba(37,99,235,0.28); transform: translateX(3px);
    }
    .pr-pet-dot {
      margin-left: auto; width: 7px; height: 7px; border-radius: 50%;
      background: rgba(255,255,255,0.85); flex-shrink: 0;
      animation: pr-pulseRing 1.5s ease infinite;
    }

    /* Category grid */
    .pr-cat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
    .pr-cat-btn {
      padding: 9px 6px; border-radius: 10px; border: 2px solid var(--border);
      background: #fff; font-size: 11px; font-weight: 700; color: var(--ink);
      cursor: pointer; letter-spacing: 0.03em; transition: all 0.18s ease;
    }
    .pr-cat-btn:hover  { border-color: var(--blue-400); background: var(--blue-50); }
    .pr-cat-btn.active {
      background: var(--blue-600); color: #fff; border-color: var(--blue-600);
      box-shadow: 0 3px 10px rgba(37,99,235,0.25);
    }

    /* Clear */
    .pr-clear {
      width: 100%; padding: 10px; border-radius: 11px;
      border: 2px solid var(--border); background: transparent;
      font-size: 13px; font-weight: 600; color: var(--muted);
      cursor: pointer; transition: all 0.18s ease;
    }
    .pr-clear:hover { border-color: #EF4444; background: #FEF2F2; color: #EF4444; }

    /* ── Product grid ── */
    .pr-count { font-size: 13px; font-weight: 500; color: var(--muted); margin-bottom: 20px; }
    .pr-count strong { color: var(--ink); font-weight: 700; }

    .pr-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
    }

    /* ── Tilt card ── */
    .pr-tilt {
      transform-style: preserve-3d;
      transition: transform 0.32s cubic-bezier(0.23,1,0.32,1), box-shadow 0.32s ease;
      animation: pr-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
      cursor: pointer;
    }
    .pr-tilt:hover {
      box-shadow: 0 20px 52px -8px rgba(37,99,235,0.2),
                  0 0 0 2px rgba(37,99,235,0.13);
    }

    .pr-card {
      background: #fff; border-radius: 20px;
      overflow: hidden; border: 2px solid var(--border);
    }

    /* Card image */
    .pr-img-wrap { position: relative; height: 205px; overflow: hidden; background: var(--blue-50); }
    .pr-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.55s cubic-bezier(0.23,1,0.32,1); }
    .pr-tilt:hover .pr-img { transform: scale(1.08); }

    .pr-badge {
      position: absolute; top: 11px; left: 11px; z-index: 2;
      background: var(--blue-600); color: #fff;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      padding: 4px 11px; border-radius: 100px; text-transform: uppercase;
      box-shadow: 0 3px 10px rgba(37,99,235,0.4);
    }
    .pr-views {
      position: absolute; top: 11px; right: 11px; z-index: 2;
      background: rgba(255,255,255,0.9); backdrop-filter: blur(8px);
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; color: var(--muted);
      padding: 4px 10px; border-radius: 100px;
      opacity: 0; transition: opacity 0.22s;
    }
    .pr-tilt:hover .pr-views { opacity: 1; }

    /* Bottom stripe */
    .pr-stripe {
      height: 3px;
      background: linear-gradient(90deg, var(--blue-600), var(--blue-400));
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.38s cubic-bezier(0.23,1,0.32,1);
    }
    .pr-tilt:hover .pr-stripe { transform: scaleX(1); }

    /* Card body */
    .pr-body        { padding: 13px 15px 15px; }
    .pr-name        { margin: 0 0 3px; font-size: 14px; font-weight: 700; color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .pr-desc        { margin: 0 0 12px; font-size: 12px; font-weight: 400; color: var(--muted); }
    .pr-bottom      { display: flex; align-items: center; justify-content: space-between; }
    .pr-price       { font-size: 20px; font-weight: 800; color: var(--blue-600); letter-spacing: -0.02em; }

    .pr-cart-btn {
      opacity: 0; transform: translateY(7px);
      padding: 7px 14px; border-radius: 100px;
      border: none; background: var(--blue-600); color: #fff;
      font-size: 12px; font-weight: 700; cursor: pointer;
      box-shadow: 0 4px 12px rgba(37,99,235,0.32);
      transition: opacity 0.22s, transform 0.22s, background 0.18s;
    }
    .pr-tilt:hover .pr-cart-btn   { opacity: 1; transform: translateY(0); }
    .pr-cart-btn:active            { animation: pr-cartPop 0.32s ease; }
    .pr-cart-btn.added             { background: #22c55e; box-shadow: 0 4px 12px rgba(34,197,94,0.35); }
    .pr-added-check                { animation: pr-checkSlide 0.25s ease both; }

    /* ── Empty state ── */
    .pr-empty {
      display: flex; flex-direction: column; align-items: center;
      padding: 80px 0; animation: pr-fadeIn 0.5s ease both;
    }
    .pr-empty-blob {
      width: 110px; height: 110px; font-size: 46px;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--blue-100), var(--blue-200));
      margin-bottom: 22px; animation: pr-blob 8s ease-in-out infinite;
    }
    .pr-empty-title { font-size: 24px; font-weight: 800; color: var(--ink); margin: 0 0 7px; }
    .pr-empty-sub   { font-size: 14px; font-weight: 500; color: var(--muted); margin: 0 0 22px; }
    .pr-empty-btn {
      background: var(--blue-600); color: #fff; border: none;
      border-radius: 100px; padding: 12px 28px;
      font-size: 14px; font-weight: 700; cursor: pointer;
      box-shadow: 0 6px 18px rgba(37,99,235,0.32);
      transition: transform 0.18s, box-shadow 0.18s;
    }
    .pr-empty-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(37,99,235,0.38); }

    /* ── Pagination ── */
    .pr-pagination { margin-top: 56px; display: flex; justify-content: center; animation: pr-fadeIn 0.5s ease both; }
    .pr-root .MuiPaginationItem-root          { font-family: 'Plus Jakarta Sans', sans-serif !important; font-weight: 600 !important; color: var(--muted) !important; border-color: var(--border) !important; }
    .pr-root .MuiPaginationItem-root.Mui-selected { background: var(--blue-600) !important; color: #fff !important; border-color: var(--blue-600) !important; box-shadow: 0 4px 12px rgba(37,99,235,0.3) !important; }
  `}</style>
);

/* ─── Types ─── */
enum PetType {
  DOG = "DOG",
  CAT = "CAT",
  BIRD = "BIRD",
  FISH = "FISH",
  SMALL_PET = "SMALL_PET",
}
const PET_EMOJI: Record<PetType, string> = {
  DOG: "🐶",
  CAT: "🐱",
  BIRD: "🐦",
  FISH: "🐠",
  SMALL_PET: "🐹",
};

interface ProductsProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

/* ─── Tilt card ─── */
function TiltCard({
  children,
  delay,
  onClick,
}: {
  children: React.ReactNode;
  delay: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    el.style.transform = `perspective(900px) rotateX(${(-y / height) * 9}deg) rotateY(${(x / width) * 9}deg) translateY(-5px) scale(1.02)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="pr-tilt"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Main ─── */
export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const history = useHistory();

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.FOOD,
    search: "",
  });
  const [searchText, setSearchText] = useState("");
  const [selectedPetType, setSelectedPetType] = useState<PetType>(PetType.DOG);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    new ProductService()
      .getProducts(productSearch)
      .then(setProducts)
      .catch(console.log);
  }, [productSearch]);

  const searchCollectionHandler = (c: ProductCollection) =>
    setProductSearch({ ...productSearch, page: 1, productCollection: c });
  const searchOrderHandler = (o: string) =>
    setProductSearch({ ...productSearch, page: 1, order: o });
  const searchProductHandler = () =>
    setProductSearch({ ...productSearch, page: 1, search: searchText });
  const petTypeHandler = (t: PetType) => {
    setSelectedPetType(t);
    setProductSearch({ ...productSearch, page: 1, search: t });
  };
  const paginationHandler = (_: ChangeEvent<any>, v: number) =>
    setProductSearch({ ...productSearch, page: v });
  const clearAllFiltersHandler = () => {
    setSearchText("");
    setSelectedPetType(PetType.DOG);
    setProductSearch({
      page: 1,
      limit: 8,
      order: "createdAt",
      productCollection: ProductCollection.FOOD,
      search: "",
    });
  };

  const handleAdd = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    setAddedId(p._id);
    setTimeout(() => setAddedId(null), 800);
    onAdd({
      _id: p._id,
      name: p.productName,
      price: p.productPrice,
      image: p.productImages[0],
      quantity: 1,
    });
  };

  return (
    <div className="pr-root">
      <Styles />
      <DiscountHero />

      <div className="pr-page">
        {/* Header */}
        <div className="pr-header">
          <p className="pr-header-sub">
            Discover the finest products for your beloved companions
          </p>
          <div className="pr-sort-row">
            {[
              { label: "Newest", value: "createdAt" },
              { label: "Price", value: "productPrice" },
              { label: "Popular", value: "productViews" },
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => searchOrderHandler(s.value)}
                className={`pr-sort-pill${productSearch.order === s.value ? " active" : ""}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="pr-layout">
          {/* Sidebar */}
          <aside className="pr-sidebar">
            <div className="pr-sidebar-bar" />
            <div className="pr-sidebar-body">
              <div className="pr-sidebar-title">
                <div className="pr-sidebar-icon">🔍</div>
                <span className="pr-sidebar-label">Filters</span>
              </div>

              {/* Search */}
              <span className="pr-section-label">Search</span>
              <div className="pr-search-row">
                <input
                  className="pr-input"
                  placeholder="Find products…"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && searchProductHandler()
                  }
                />
                <button className="pr-go-btn" onClick={searchProductHandler}>
                  Go
                </button>
              </div>

              <div className="pr-divider" />

              {/* Pet type */}
              <span className="pr-section-label">Pet Type</span>
              <div className="pr-pet-list">
                {Object.values(PetType).map((type) => (
                  <button
                    key={type}
                    onClick={() => petTypeHandler(type)}
                    className={`pr-pet-pill${selectedPetType === type ? " active" : ""}`}
                  >
                    <span style={{ fontSize: 16 }}>{PET_EMOJI[type]}</span>
                    {type.replace("_", " ")}
                    {selectedPetType === type && (
                      <span className="pr-pet-dot" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pr-divider" />

              {/* Category */}
              <span className="pr-section-label">Category</span>
              <div className="pr-cat-grid">
                {Object.values(ProductCollection).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => searchCollectionHandler(cat)}
                    className={`pr-cat-btn${productSearch.productCollection === cat ? " active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="pr-divider" />
              <button onClick={clearAllFiltersHandler} className="pr-clear">
                ✕ Clear all filters
              </button>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <p className="pr-count">
              Showing <strong>{products.length}</strong> products
            </p>

            {products.length > 0 ? (
              <div className="pr-grid">
                {products.map((product: Product, i: number) => {
                  const isAdded = addedId === product._id;
                  return (
                    <TiltCard
                      key={product._id}
                      delay={i * 60}
                      onClick={() => history.push(`/products/${product._id}`)}
                    >
                      <div className="pr-card">
                        <div className="pr-img-wrap">
                          <img
                            src={`${serverApi}/${product.productImages[0]}`}
                            alt={product.productName}
                            className="pr-img"
                          />
                          <span className="pr-badge">
                            {product.productCollection}
                          </span>
                          <span className="pr-views">
                            👁 {product.productViews ?? 0}
                          </span>
                        </div>

                        <div className="pr-stripe" />

                        <div className="pr-body">
                          <h3 className="pr-name">{product.productName}</h3>
                          <p className="pr-desc">
                            Premium quality for your pet
                          </p>
                          <div className="pr-bottom">
                            <span className="pr-price">
                              ${product.productPrice}
                            </span>
                            <button
                              className={`pr-cart-btn${isAdded ? " added" : ""}`}
                              onClick={(e) => handleAdd(e, product)}
                            >
                              {isAdded ? (
                                <span className="pr-added-check">✓ Added</span>
                              ) : (
                                "+ Cart"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            ) : (
              <div className="pr-empty">
                <div className="pr-empty-blob">🐾</div>
                <h3 className="pr-empty-title">Nothing here yet</h3>
                <p className="pr-empty-sub">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  className="pr-empty-btn"
                  onClick={clearAllFiltersHandler}
                >
                  Clear all filters
                </button>
              </div>
            )}

            {products.length > 0 && (
              <div className="pr-pagination">
                <Pagination
                  page={productSearch.page}
                  onChange={paginationHandler}
                  count={Math.ceil(products.length / productSearch.limit) || 1}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
