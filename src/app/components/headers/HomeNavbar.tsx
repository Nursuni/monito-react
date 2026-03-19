import React from "react";
import { NavLink } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import TopOffer from "./TopOffer";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import NavBar from "./Navbar";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (v: boolean) => void;
  setLoginOpen: (v: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  return (
    <>
      <TopOffer />

      {/* ── Shared nav strip ── */}
      <NavBar
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll}
        setLoginOpen={setLoginOpen}
        handleLogoutClick={handleLogoutClick}
        anchorEl={anchorEl}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      />

      {/* ── Hero ── */}
      <section className="hero-section">
        {/* Decorative orbs */}
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />

        <div className="hero-inner">
          {/* Left image */}
          <div className="hero-img-wrap hero-img-wrap--left">
            <div className="hero-img-circle">
              <img src="img/ban-2.jpg" alt="Pet care" />
            </div>
            <button className="hero-img-badge">↗</button>
          </div>

          {/* Center copy */}
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Trusted Pet Care
            </div>

            <h1 className="hero-heading">
              Ensure the
              <br />
              well-being <em>of</em>
              <br />
              <span className="hero-heading-accent">your pets.</span>
            </h1>

            <p className="hero-sub">
              Safe, trusted care — whether at your home or theirs.
            </p>

            <div className="hero-cta-row">
              {!authMember ? (
                <button
                  className="hero-btn-primary"
                  onClick={() => setSignupOpen(true)}
                >
                  Sign Up Free
                </button>
              ) : (
                <NavLink to="/products" className="hero-btn-primary">
                  All Collection
                </NavLink>
              )}

              <button className="hero-btn-secondary">
                <FavoriteBorderIcon style={{ fontSize: 18 }} />
                Favourites
              </button>
            </div>

            {/* Trust badges */}
            <div className="hero-trust-row">
              {["10k+ happy pets", "Verified sitters", "Same-day service"].map(
                (t) => (
                  <span key={t} className="hero-trust-badge">
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right image */}
          <div className="hero-img-wrap hero-img-wrap--right">
            <div className="hero-img-pill">
              <img src="img/ban-3.jpg" alt="Pet sitter" />
            </div>
            <div className="hero-img-chip">
              <span className="hero-img-chip-dot" />
              Trusted pet sitters
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
