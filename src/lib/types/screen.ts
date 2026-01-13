import ChosenProduct from "../../app/screens/productsPage/ChosenProduct";
import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE */ //Screen-component-based & target oriented type integration
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/** Homepage */
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** ProductPage */
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** OrderPage */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
