import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

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
      <div className="home-navbar">
        <Container className="navbar-container">
          <Stack className="header-frame">
            <Stack className="detail">
              <Box>
                <Box className="head-main-txt">
                  More Fun, More Love for Your Pet!
                </Box>
                <Box className="wel-txt">
                  Premium quality products for your furry friends. Shop food,
                  toys, accessories and more!
                </Box>
                <Box className="signup">
                  {!authMember && (
                    <Button
                      variant="contained"
                      className="signup-button"
                      onClick={() => setSignupOpen(true)}
                    >
                      Sign up
                    </Button>
                  )}

                  <NavLink to="/products">
                    <Button variant="outlined" className="shop-button">
                      Explore Now →
                    </Button>
                  </NavLink>
                </Box>
              </Box>
              <Box className="logo-frame">
                <div className="logo-img">
                  <img src="/img/home-nav.png" alt="Pet products" />
                </div>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
    </>
  );
}
