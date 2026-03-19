import React, { useEffect } from "react";
import Statistics from "./Statistics";
import Advertisement from "./Advertisement";
import Events from "./Events";
import ActiveUsers from "./ActiveUsers";
import "../../../css/home.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularProducts, setNewProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import NewProducts from "./NewProducts";
import PopularProducts from "./PopularProducts";
import MarqueeLogos from "../productsPage/Trusted-Brand";
import HeroPetShop from "./HeroPetShop";
import Reviews from "./Reviews";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage({ onAdd }: HomePageProps) {
  const { setPopularProducts, setNewProducts, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({ page: 1, limit: 4, order: "productsViews" })
      .then((data) => setPopularProducts(data))
      .catch((err) => console.log("Err, popularProducts", err));

    product
      .getProducts({ page: 1, limit: 4, order: "createdAt" })
      .then((data) => setNewProducts(data))
      .catch((err) => console.log("Err, newProducts", err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log("Err, getTopUsers", err));
  }, []);

  return (
    <div className="homepage">
      <PopularProducts onAdd={onAdd} />
      <HeroPetShop />
      <MarqueeLogos />
      <NewProducts onAdd={onAdd} />
      <Advertisement />
      <ActiveUsers />
      <Reviews />
      <Statistics />
      <Events />
    </div>
  );
}
