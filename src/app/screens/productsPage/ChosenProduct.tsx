import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import { setChosenProduct, setAdmin } from "./slice";
import { Product } from "../../../lib/types/product";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { retrieveChosenProduct, retrieveAdmin } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct }),
);
const adminRetriever = createSelector(retrieveAdmin, (admin) => ({ admin }));

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .cp-root, .cp-root * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
    .cp-root {
      --navy:   #1E3A5F;
      --ink:    #0F172A;
      --muted:  #64748B;
      --border: #E2E8F0;
      --bg:     #F8FAFF;
      --blue-50:  #EFF6FF;
      --blue-200: #BFDBFE;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
    }

    @keyframes cp-fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .cp-left  { animation: cp-fadeUp 0.5s 0.05s cubic-bezier(0.22,1,0.36,1) both; }
    .cp-right { animation: cp-fadeUp 0.5s 0.15s cubic-bezier(0.22,1,0.36,1) both; }

    /* Swiper */
    .cp-slider .swiper { border-radius: 20px; overflow: hidden; }
    .cp-slider .swiper-button-next,
    .cp-slider .swiper-button-prev {
      width: 36px !important; height: 36px !important;
      background: rgba(255,255,255,0.92);
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    }
    .cp-slider .swiper-button-next::after,
    .cp-slider .swiper-button-prev::after { font-size: 12px !important; color: var(--navy); font-weight: 800; }
    .cp-slider .swiper-pagination-bullet-active { background: var(--blue-600) !important; }

    /* Thumb strip */
    .cp-thumbs { display: flex; gap: 8px; margin-top: 10px; }
    .cp-thumb {
      width: 60px; height: 60px; border-radius: 10px; overflow: hidden;
      border: 2px solid var(--border); cursor: pointer;
      transition: border-color 0.15s;
      flex-shrink: 0;
    }
    .cp-thumb:hover { border-color: var(--blue-600); }
    .cp-thumb img { width: 100%; height: 100%; object-fit: cover; }

    /* Badge */
    .cp-collection-badge {
      display: inline-flex; align-items: center;
      background: var(--blue-50); color: var(--blue-600);
      border: 1.5px solid var(--blue-200);
      font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; padding: 4px 12px; border-radius: 100px;
      margin-bottom: 12px;
    }

    /* Info card sections */
    .cp-divider { height: 1px; background: var(--border); margin: 20px 0; }

    /* Seller card */
    .cp-seller {
      display: flex; align-items: center; gap: 12px;
      background: var(--bg); border: 1.5px solid var(--border);
      border-radius: 14px; padding: 14px 16px;
    }
    .cp-seller-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: var(--navy); color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; font-weight: 800; flex-shrink: 0;
    }
    .cp-seller-name  { font-size: 14px; font-weight: 700; color: var(--ink); margin: 0; }
    .cp-seller-phone { font-size: 12px; font-weight: 500; color: var(--muted); margin: 0; }

    /* Trust pills */
    .cp-trust { display: flex; gap: 10px; flex-wrap: wrap; }
    .cp-trust-pill {
      display: flex; align-items: center; gap: 6px;
      background: #F0FDF4; border: 1px solid #BBF7D0;
      color: #15803D; font-size: 12px; font-weight: 600;
      padding: 5px 12px; border-radius: 100px;
    }

    /* Price */
    .cp-price-val { font-size: 32px; font-weight: 800; color: var(--navy); letter-spacing: -0.03em; }
    .cp-price-label { font-size: 12px; font-weight: 500; color: var(--muted); margin-bottom: 4px; }

    /* Add to cart button */
    .cp-btn {
      width: 100%; padding: 14px;
      background: var(--navy); color: #fff;
      border: none; border-radius: 14px;
      font-size: 15px; font-weight: 800;
      cursor: pointer; letter-spacing: 0.02em;
      display: flex; align-items: center; justify-content: center; gap: 9px;
      box-shadow: 0 6px 20px rgba(30,58,95,0.25);
      transition: opacity 0.18s, transform 0.18s;
    }
    .cp-btn:hover  { opacity: 0.9; transform: translateY(-1px); }
    .cp-btn:active { transform: translateY(0); }
    .cp-btn.added  { background: #16a34a; box-shadow: 0 6px 20px rgba(22,163,74,0.28); }
  `}</style>
);

export default function ChosenProduct({ onAdd }: ChosenProductProps) {
  const { productId } = useParams<{ productId: string }>();
  const { setAdmin, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { admin } = useSelector(adminRetriever);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    new ProductService()
      .getProduct(productId)
      .then(setChosenProduct)
      .catch(console.log);
    new MemberService().getAdmin().then(setAdmin).catch(console.log);
  }, []);

  if (!chosenProduct) return null;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    onAdd({
      _id: chosenProduct._id,
      name: chosenProduct.productName,
      price: chosenProduct.productPrice,
      image: chosenProduct.productImages[0],
      quantity: 1,
    });
  };

  return (
    <div
      className="cp-root"
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        padding: "48px 0 96px",
      }}
    >
      <Styles />
      <Container maxWidth="lg">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* ── LEFT — images ── */}
          <div className="cp-left cp-slider">
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
            >
              {chosenProduct.productImages.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={`${serverApi}/${img}`}
                    style={{
                      width: "100%",
                      height: 420,
                      objectFit: "cover",
                      display: "block",
                    }}
                    alt={chosenProduct.productName}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail strip */}
            <div className="cp-thumbs">
              {chosenProduct.productImages.map((img, i) => (
                <div key={i} className="cp-thumb">
                  <img src={`${serverApi}/${img}`} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — info ── */}
          <div
            className="cp-right"
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1.5px solid var(--border)",
              padding: "28px 28px 24px",
            }}
          >
            {/* Collection badge */}
            <span className="cp-collection-badge">
              {chosenProduct.productCollection}
            </span>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(20px,2.5vw,28px)",
                fontWeight: 800,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                margin: "0 0 16px",
                lineHeight: 1.2,
              }}
            >
              {chosenProduct.productName}
            </h1>

            {/* Rating & views */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <Rating value={4.5} readOnly size="small" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "var(--muted)",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                <RemoveRedEyeIcon sx={{ fontSize: 15 }} />
                {chosenProduct.productViews} views
              </div>
            </div>

            {/* Seller */}
            <div className="cp-seller">
              <div className="cp-seller-avatar">
                {admin?.memberNick?.charAt(0) || "M"}
              </div>
              <div>
                <p className="cp-seller-name">
                  {admin?.memberNick || "Monito Store"}
                </p>
                <p className="cp-seller-phone">
                  {admin?.memberPhone || "Official seller"}
                </p>
              </div>
            </div>

            <div className="cp-divider" />

            {/* Description */}
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "var(--muted)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {chosenProduct.productDesc ||
                "Premium quality product carefully selected for your beloved pet."}
            </p>

            <div className="cp-divider" />

            {/* Trust pills */}
            <div className="cp-trust" style={{ marginBottom: 20 }}>
              <span className="cp-trust-pill">
                <LocalShippingOutlinedIcon sx={{ fontSize: 14 }} />
                Free shipping
              </span>
              <span className="cp-trust-pill">
                <VerifiedOutlinedIcon sx={{ fontSize: 14 }} />
                Vet approved
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <div>
                <p className="cp-price-label">Price</p>
                <p className="cp-price-val">
                  ${chosenProduct.productPrice.toLocaleString()}
                </p>
              </div>
              <span
                style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}
              >
                In stock: {chosenProduct.productLeftCount ?? "—"}
              </span>
            </div>

            {/* CTA */}
            <button
              className={`cp-btn${added ? " added" : ""}`}
              onClick={handleAdd}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
              {added ? "✓ Added to cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
