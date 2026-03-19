import React from "react";

import { CartItem } from "../../../lib/types/search";
import NavBar from "./Navbar";

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
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

  return (
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
  );
}
