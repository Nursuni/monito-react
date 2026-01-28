import React, { useEffect } from "react";
import { Container, Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
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

/* Redux */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct }),
);

const adminRetriever = createSelector(retrieveAdmin, (admin) => ({ admin }));

export default function ChosenProduct({ onAdd }: ChosenProductProps) {
  const { productId } = useParams<{ productId: string }>();
  const { setAdmin, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { admin } = useSelector(adminRetriever);

  useEffect(() => {
    new ProductService()
      .getProduct(productId)
      .then(setChosenProduct)
      .catch(console.log);

    new MemberService().getAdmin().then(setAdmin).catch(console.log);
  }, []);

  if (!chosenProduct) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <Swiper navigation modules={[Navigation]}>
              {chosenProduct.productImages.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={`${serverApi}/${img}`}
                    className="w-full h-[420px] object-cover"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-7">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-snug">
                {chosenProduct.productName}
              </h1>
            </div>

            {/* Seller */}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {admin?.memberNick?.charAt(0) || "M"}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {admin?.memberNick || "Monito Store"}
                </p>
                <p className="text-sm text-gray-500">
                  {admin?.memberPhone || "Contact seller"}
                </p>
              </div>
            </div>

            {/* Rating & Views */}
            <div className="flex items-center gap-6">
              <Rating value={4.5} readOnly />
              <div className="flex items-center gap-2 text-gray-500">
                <RemoveRedEyeIcon sx={{ fontSize: 18 }} />
                <span className="text-sm font-medium">
                  {chosenProduct.productViews} views
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {chosenProduct.productDesc || "No description available."}
              </p>
            </div>

            {/* Price */}
            <div className="border-t pt-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-3xl font-bold text-green-600">
                  ${chosenProduct.productPrice.toLocaleString()}
                </p>
              </div>
              <span className="text-sm text-gray-400">Free shipping</span>
            </div>

            {/* Add to cart */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#2563eb",
                padding: "14px",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1d4ed8",
                },
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
              Add to cart
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
