import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import { CartItem } from "../../../lib/types/search";

import UsefulKnowledge from "./UsefulKnowledge";

interface ProductsPageProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}
export default function ProductsPage(props: ProductsPageProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const products = useRouteMatch();
  console.log("products:", products);
  return (
    <div className={"products-page"}>
      <Switch>
        <Route path={`${products.path}/:productId`}>
          {" "}
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${products.path}`}>
          <Products
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />
          <UsefulKnowledge />
        </Route>
      </Switch>
    </div>
  );
}
