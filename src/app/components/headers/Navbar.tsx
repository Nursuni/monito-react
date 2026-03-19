/**
 * NavBar.tsx  —  shared navigation strip
 * Used by both HomeNavbar and OtherNavbar so the bar is 100% identical.
 */
import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { ListItemIcon } from "@material-ui/core";
import { Logout } from "@mui/icons-material";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

interface NavBarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setLoginOpen: (v: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function NavBar(props: NavBarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  return (
    <div className="nav-strip">
      <div className="nav-inner">
        {/* ── Logo ── */}
        <NavLink to="/" className="nav-logo-link">
          <img src="/icons/frame.svg" alt="Brand Logo" className="nav-logo" />
        </NavLink>

        {/* ── Links ── */}
        <nav className="nav-links">
          <NavLink to="/" exact activeClassName="nav-active">
            Home
          </NavLink>
          <NavLink to="/products" activeClassName="nav-active">
            Shop
          </NavLink>
          {authMember && (
            <NavLink to="/orders" activeClassName="nav-active">
              My Orders
            </NavLink>
          )}
          {authMember && (
            <NavLink to="/member-page" activeClassName="nav-active">
              My Page
            </NavLink>
          )}
          <NavLink to="/help" activeClassName="nav-active">
            Help
          </NavLink>
          <NavLink to="/aboutus" activeClassName="nav-active">
            About Us
          </NavLink>
        </nav>

        {/* ── Right actions ── */}
        <div className="nav-actions">
          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />

          {!authMember ? (
            <button
              className="nav-login-btn"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </button>
          ) : (
            <img
              className="nav-avatar"
              src={
                authMember?.memberImage
                  ? `${serverApi}/${authMember.memberImage}`
                  : "/icons/default-user.svg"
              }
              alt="User Avatar"
              onClick={handleLogoutClick}
            />
          )}
        </div>
      </div>

      {/* ── Logout dropdown ── */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleCloseLogout}
        onClick={handleCloseLogout}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 4px 16px rgba(37,99,235,0.15))",
            mt: 1.5,
            borderRadius: "12px",
            border: "1.5px solid #DBEAFE",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 16,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              borderTop: "1.5px solid #DBEAFE",
              borderLeft: "1.5px solid #DBEAFE",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleLogoutRequest}
          sx={{
            gap: 1,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            color: "#0F172A",
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" style={{ color: "#2563EB" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
