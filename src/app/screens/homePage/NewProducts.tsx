import React from "react";
import { Container, Stack, Box } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles/CssVarsProvider";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { createSelector } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { retrieveNewProducts } from "./selector";
import { ProductCollection } from "../../../lib/enums/product.enum";

/**REDUX SLICE & SELECTOR */

const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => {
    return { newProducts };
  },
);

export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);
  console.log("popularProducts: retrievePopularProductts", newProducts);
  return (
    <div className="py-10 px-4 bg-white">
      <Box className="max-w-[1300px] mx-auto">
        <Stack className="space-y-6">
          {/* Header Section */}
          <Box className="flex justify-between items-center">
            <Box>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                What's new
              </p>
              <h2 className="text-2xl font-bold text-gray-900">New products</h2>
            </Box>
            <button className="px-6 py-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full font-semibold text-sm transition-all">
              View more
            </button>
          </Box>

          {/* Cards Row */}
          <Box className="flex gap-6 overflow-x-auto pb-4 justify-center">
            <CssVarsProvider>
              {newProducts.length !== 0 ? (
                newProducts.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "l"
                      : product.productSize;
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className="group cursor-pointer flex-shrink-0"
                      sx={{
                        width: "260px !important",
                        height: "auto !important",
                        backgroundColor: "#fafafa",
                        borderRadius: "14px",
                        overflow: "hidden",
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          borderColor: "#93c5fd",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <CardOverflow sx={{ padding: 0, position: "relative" }}>
                        <div className="absolute top-2.5 right-2.5 z-10 bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {sizeVolume}
                        </div>

                        <div className="absolute top-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                          {product.productCollection}
                        </div>

                        <AspectRatio ratio="1">
                          <img
                            src={imagePath}
                            alt=""
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow
                        variant="soft"
                        sx={{
                          backgroundColor: "#ffffff",
                          padding: "14px",
                        }}
                      >
                        <Stack className="space-y-2.5">
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: "#111827",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {product.productName}
                          </Typography>

                          <Box className="flex items-center gap-1.5 text-gray-500">
                            <VisibilityIcon sx={{ fontSize: 16 }} />
                            <Typography
                              sx={{ fontSize: "13px", fontWeight: 500 }}
                            >
                              {product.productViews}
                            </Typography>
                          </Box>

                          <Box className="flex items-center justify-between pt-2.5 border-t border-gray-200">
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 700,
                                color: "#2563eb",
                              }}
                            >
                              ${product.productPrice}
                            </Typography>
                            <button className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all">
                              <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
                              Add
                            </button>
                          </Box>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="w-full text-center py-16 text-lg font-semibold text-gray-400">
                  New Products are not available!
                </Box>
              )}
            </CssVarsProvider>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}
