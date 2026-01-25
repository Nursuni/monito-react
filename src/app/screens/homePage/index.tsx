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
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";

import NewProducts from "./NewProducts";
import PopularProducts from "./PopularProducts";

import Reviews from "./Reviews";
import MarqueeLogos from "../productsPage/Trusted-Brand";

/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularProducts, setNewProducts, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    //Backend server data request => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productsViews",
        productCollection: ProductCollection.FOOD,
      })
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((err) => console.log("Err, popularProducts", err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => setNewProducts(data))
      .catch((err) => console.log("Err, popularProducts", err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log("Err, getTopUsers", err));
  }, []);

  return (
    <div className="homepage">
      <PopularProducts />
      <MarqueeLogos />
      <NewProducts />
      <Advertisement />
      <ActiveUsers />
      <Statistics />
      <Events />
    </div>
  );
}
