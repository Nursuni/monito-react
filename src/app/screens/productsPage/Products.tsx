import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

interface ProductsProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
  //setRestaurant: (data: Product[]) => dispatch(setRestaurant(data)),
  // setChosenProduct: (data: Product[]) => dispatch(setChosenProduct(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products(props: ProductsProps) {
  const { onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.ACCESSORY,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        console.log(" before", data);
        setProducts(data);
        console.log(" after", data);
        console.log("products after 2", products);
      })
      .catch((err) => console.log("Err, setProducts", err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };
  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection="column" alignItems="center">
          <Stack className="avatar-big-box">
            <Stack className={"category-title"}>
              {" "}
              <p> Burak Restaurant </p>
              <Stack className="single-search-big-box">
                <input
                  type="search"
                  className="single-search-input"
                  name="singleResearch"
                  placeholder="Type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />

                <Button
                  className="single-button-search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section" justifyContent="flex-end">
            <Button
              variant="contained"
              color={
                productSearch.order === "createdAt" ? "primary" : "secondary"
              }
              className="order"
              onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>
            <Button
              variant="contained"
              color={
                productSearch.order === "productPrice" ? "primary" : "secondary"
              }
              className="order"
              onClick={() => searchOrderHandler("productPrice")}
            >
              Price
            </Button>
            <Button
              variant="contained"
              color={
                productSearch.order === "productViews" ? "primary" : "secondary"
              }
              className="order"
              onClick={() => searchOrderHandler("productViews")}
            >
              Views
            </Button>
          </Stack>

          <Stack className="list-category-section">
            {" "}
            <Stack className="product-category">
              <div
                className="category-main"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "space-evenly",
                }}
              >
                {" "}
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  OTHER
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.FOOD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.FOOD)
                  }
                >
                  DESERT
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  DRINK
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.TREAT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.TREAT)
                  }
                >
                  Salad
                </Button>{" "}
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    ProductCollection.ACCESSORY
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.ACCESSORY)
                  }
                >
                  Dish
                </Button>{" "}
              </div>
            </Stack>
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "litre"
                      : product.productSize + "size";

                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>

                        <Button
                          className="shop-btn"
                          sx={{
                            minWidth: "unset",
                            padding: "5px",
                          }}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src="/icons/shopping-cart.svg"
                            alt="Add to Cart"
                            style={{ width: "24px", height: "20px" }}
                          />
                        </Button>

                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className="product-desc">
                        <Box className="product-title">
                          <span>{product.productName}</span>
                          <div className="product-price">
                            <MonetizationOnIcon color="secondary" />
                            {product.productPrice}
                          </div>
                        </Box>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brand-logo">
        <Container className="family-brands">
          <Box className="category-title">Our Family Brands</Box>

          <Stack
            className="brand-list"
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={11}
          >
            <Box className="review-box">
              <img src="/img/gurme.webp" alt="Brand 1" />
            </Box>
            <Box className="review-box">
              <img src="/img/seafood.webp" alt="Brand 2" />
            </Box>
            <Box className="review-box">
              <img src="/img/sweets.webp" alt="Brand 3" />
            </Box>
            <Box className="review-box">
              <img src="/img/doner.webp" alt="Brand 4" />
            </Box>
          </Stack>
        </Container>
      </div>
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"category-title"}>Our address</Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5262489589635!2d69.28586867611149!3d41.34119147127584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8d660b2bd55d%3A0xd86dc4c9715c2025!2sYunusabad%20District%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1731707776783!5m2!1sen!2sus"
              width="1320"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Stack>
        </Container>
      </div>
    </div>
  );
}
