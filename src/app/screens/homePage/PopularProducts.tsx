import React from "react";
import { Stack, Box } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles/CssVarsProvider";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrievePopularProductts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const popularProductsRetriever = createSelector(
  retrievePopularProductts,
  (popularProducts) => ({ popularProducts }),
);

export default function PopularProducts() {
  const { popularProducts } = useSelector(popularProductsRetriever);

  return (
    <div className="py-10 px-4">
      <Box className="max-w-[1300px] mx-auto">
        <Stack className="space-y-6">
          {/* Header */}
          <Box className="flex justify-between items-center">
            <Box>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Most viewed
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                Popular products
              </h2>
            </Box>
          </Box>

          {/* Cards */}
          <Box className="flex gap-6 overflow-x-auto pb-4 justify-center">
            <CssVarsProvider>
              {popularProducts.length !== 0 ? (
                popularProducts.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className="group cursor-pointer flex-shrink-0"
                      sx={{
                        width: "260px !important",
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
                      {/* Image */}
                      <CardOverflow sx={{ padding: 0 }}>
                        <AspectRatio ratio="1">
                          <img
                            src={imagePath}
                            alt={product.productName}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </AspectRatio>
                      </CardOverflow>

                      {/* Content */}
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
                  Popular products are not available!
                </Box>
              )}
            </CssVarsProvider>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}
