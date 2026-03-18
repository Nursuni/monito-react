import { Container, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import React from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NorthEastIcon from "@mui/icons-material/NorthEast";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
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
    
      {/* TOP OFFER BAR */}
      <div className="top-offer">
        <p>
          <span className="offer-badge">Launch Offer</span>
          Free delivery for orders over
          <span className="price">
            <span className="price-symbol">$</span>
            <span className="price-amount">49.99</span>
          </span>
        </p>
      </div>

      //TODO: SIgnup left somewhere

      {/* STICKY NAVIGATION - MOVED OUTSIDE CONTAINER */}
      <Box className="sticky-nav">
        <Stack className="menu" direction="row" alignItems="center">
          <Box className="nav-left">
            <NavLink to="/">
              <img
                className="brand-logo"
                src="/icons/frame.svg"
                alt="Brand Logo"
              />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/products" activeClassName="underline">
                Category
              </NavLink>
            </Box>
            {authMember && (
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            )}
            {authMember && (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            )}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/aboutus" activeClassName="underline">
                About Us
              </NavLink>
            </Box>

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Box className="hover-line">
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup="true"
                onClick={handleLogoutClick}
                alt="User Avatar"
              />
            )}
          </Stack>
        </Stack>

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
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleLogoutRequest}>
            <ListItemIcon>
              <Logout fontSize="small" style={{ color: "blue" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>

      {/* HEADER CONTENT */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 3, md: 8 },
          backgroundColor: "#ecfbf9",
          gap: 6,
          overflow: "hidden",
        }}
      >
        {/* LEFT IMAGE */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: 420,
                height: 420,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #cfeeed, #b7e3df)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
              }}
            >
              <Box
                component="img"
                src="img/ban-2.jpg"
                alt="Main pet"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>

            {/* floating arrow */}
            <IconButton
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 56,
                height: 56,
                backgroundColor: "#ffe3a3",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                "&:hover": { backgroundColor: "#ffd777" },
              }}
            >
              <NorthEastIcon />
            </IconButton>
          </Box>
        </Box>

        {/* CENTER CONTENT */}
        <Box sx={{ flex: 1.4 }}>
          <Typography
            sx={{
              fontSize: { xs: 36, md: 52 },
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#0f3d3e",
            }}
          >
            Ensure the <br />
            well-being <em style={{ fontWeight: 400 }}>of</em>{" "}
            <span style={{ fontStyle: "italic" }}>your pets.</span>
          </Typography>

          <Typography sx={{ mt: 2, mb: 4, color: "#5f8f8b", maxWidth: 420 }}>
            Your pet stays in a sitter’s home or yours — whether you’re
            traveling or just out for the day.
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" mb={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff5a3c",
                borderRadius: 999,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#e54d32" },
              }}
            >
              ALL COLLECTION
            </Button>

            <IconButton
              sx={{
                border: "1px solid #ff5a3c",
                color: "#ff5a3c",
                width: 48,
                height: 48,
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Stack>

          {/* PRODUCT PREVIEW */}
          <Stack direction="row" spacing={3}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#dff3ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                overflow: "hidden", // Make sure the image doesn't overflow the circle
              }}
            >
              <Box
                component="img"
                src="/img/food.jpg"
                alt="product 1"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Fill the circle
                  borderRadius: "50%", // Make the image round
                }}
              />
            </Box>

            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#ffe6d8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src="/img/gam3.png"
                alt="product 2"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>

            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#efe6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src="/img/foog.png"
                alt="product 3"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Stack>
        </Box>

        {/* RIGHT IMAGE */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: 260,
                height: 380,
                borderRadius: "140px",
                background: "linear-gradient(135deg, #ffe7c7, #ffddb0)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
              }}
            >
              <Box
                component="img"
                src="img/ban-3.jpg"
                alt="Side pet"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Chip
              avatar={
                <Box
                  component="img"
                  src="img/ban3.webp"
                  sx={{ width: 24, height: 24, borderRadius: "50%" }}
                />
              }
              label="Trusted pet sitters"
              sx={{
                position: "absolute",
                bottom: -18,
                left: -40,
                px: 1.5,
                backgroundColor: "white",
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                borderRadius: 999,
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
