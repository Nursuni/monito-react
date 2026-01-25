import React, { useDebugValue, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { setChosenProduct, setAdmin } from "./slice";
import { Product } from "../../../lib/types/product";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { retrieveChosenProduct, retrieveAdmin } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  }),
);
const adminRetriever = createSelector(retrieveAdmin, (admin) => ({
  admin,
}));

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setAdmin, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { admin } = useSelector(adminRetriever);
  console.log("productid", productId);
  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getAdmin()
      .then((data) => setAdmin(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;
  return (
    <div className="chosen-product bg-white min-h-screen py-8">
      <Box className="text-center text-3xl font-bold mb-8 text-gray-800">
        Product Detail
      </Box>
      <Container className="product-container">
        <Stack className="chosen-product-slider bg-white rounded-2xl shadow-lg overflow-hidden p-6">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area rounded-xl"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img
                    className="slider-image w-full h-full object-cover rounded-xl"
                    src={imagePath}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className="chosen-product-info">
          <Box className="info-box bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <strong className="product-name block text-4xl font-bold text-gray-900">
              {chosenProduct?.productName}
            </strong>
            <div className="space-y-2">
              <span className="resto-name block text-lg font-semibold text-gray-700">
                {admin?.memberNick}
              </span>
              <span className="resto-name block text-base text-gray-600">
                {admin?.memberPhone}
              </span>
            </div>
            <Box className="rating-box flex items-center gap-6 py-4">
              <Rating
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
                size="large"
              />
              <div className="evaluation-box">
                <div className="product-view flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <RemoveRedEyeIcon
                    sx={{ fontSize: "20px", color: "#6b7280" }}
                  />
                  <span className="text-gray-700 font-medium">
                    {chosenProduct?.productViews}
                  </span>
                </div>
              </div>
            </Box>
            <p className="product-desc text-gray-600 leading-relaxed text-base">
              {chosenProduct?.productDesc
                ? chosenProduct?.productDesc
                : "No Description"}
            </p>
            <Divider height="1" width="100%" bg="#e5e7eb" />
            <div className="product-price flex justify-between items-center text-2xl font-bold py-4">
              <span className="text-gray-700">Price:</span>
              <span className="text-green-600">
                ${chosenProduct.productPrice}
              </span>
            </div>
            <div className="button-box pt-4">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#3b82f6",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                  },
                  padding: "14px 28px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
                onClick={() =>
                  onAdd({
                    _id: chosenProduct._id,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                    quantity: 1,
                  })
                }
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
