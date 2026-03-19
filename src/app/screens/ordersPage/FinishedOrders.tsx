import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { retrieveFinishedOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { Order, OrderItem } from "../../../lib/types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders }),
);

const f = "'Plus Jakarta Sans', sans-serif";

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"} style={{ padding: 0 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontFamily: f,
        }}
      >
        {finishedOrders?.map((order: Order) => (
          <div
            key={order._id}
            style={{
              background: "white",
              borderRadius: 16,
              border: "1.5px solid #E2E8F0",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              overflow: "hidden",
              fontFamily: f,
            }}
          >
            {/* Items */}
            <div style={{ padding: "20px 20px 16px" }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  margin: "0 0 14px",
                  fontFamily: f,
                }}
              >
                Order Items
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  maxHeight: 320,
                  overflowY: "auto",
                }}
              >
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id,
                  )[0];
                  return (
                    <div
                      key={item._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: "#F8FAFC",
                        fontFamily: f,
                      }}
                    >
                      <img
                        src={`${serverApi}/${product.productImages[0]}`}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 10,
                          flexShrink: 0,
                        }}
                        alt={product.productName}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontWeight: 600,
                            color: "#0F172A",
                            margin: "0 0 3px",
                            fontSize: 14,
                            fontFamily: f,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product.productName}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            margin: 0,
                            fontFamily: f,
                          }}
                        >
                          ${item.itemPrice} each
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 16,
                          fontSize: 13,
                          textAlign: "center",
                          fontFamily: f,
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: 11,
                              color: "#64748B",
                              margin: "0 0 2px",
                              fontFamily: f,
                            }}
                          >
                            Qty
                          </p>
                          <p
                            style={{
                              fontWeight: 700,
                              color: "#0F172A",
                              margin: 0,
                              fontFamily: f,
                            }}
                          >
                            {item.itemQuantity}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p
                            style={{
                              fontSize: 11,
                              color: "#64748B",
                              margin: "0 0 2px",
                              fontFamily: f,
                            }}
                          >
                            Subtotal
                          </p>
                          <p
                            style={{
                              fontWeight: 700,
                              color: "#0F172A",
                              margin: 0,
                              fontFamily: f,
                            }}
                          >
                            ${item.itemQuantity * item.itemPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div
              style={{
                background: "#F8FAFC",
                padding: "16px 20px",
                borderTop: "1px solid #E2E8F0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    fontFamily: f,
                  }}
                >
                  <span style={{ color: "#64748B", fontFamily: f }}>
                    Product Cost
                  </span>
                  <span
                    style={{ fontWeight: 600, color: "#0F172A", fontFamily: f }}
                  >
                    ${order.orderTotal - order.orderDelivery}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    fontFamily: f,
                  }}
                >
                  <span style={{ color: "#64748B", fontFamily: f }}>
                    Delivery Fee
                  </span>
                  <span
                    style={{ fontWeight: 600, color: "#0F172A", fontFamily: f }}
                  >
                    ${order.orderDelivery}
                  </span>
                </div>
                <div
                  style={{
                    borderTop: "1px solid #E2E8F0",
                    paddingTop: 10,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{ fontWeight: 700, color: "#0F172A", fontFamily: f }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      color: "#2563EB",
                      fontFamily: f,
                    }}
                  >
                    ${order.orderTotal}
                  </span>
                </div>
              </div>

              {/* Date & Status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  borderTop: "1px solid #E2E8F0",
                }}
              >
                <span style={{ fontSize: 12, color: "#64748B", fontFamily: f }}>
                  {moment().format("YY-MM-DD HH:mm")}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 16px",
                    background: "#DCFCE7",
                    color: "#16A34A",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: f,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Completed
                </div>
              </div>
            </div>
          </div>
        ))}

        {(!finishedOrders || finishedOrders.length === 0) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "48px 0",
              fontFamily: f,
            }}
          >
            <img
              src="/icons/noimage-list.svg"
              style={{
                width: 160,
                height: 160,
                opacity: 0.35,
                marginBottom: 16,
              }}
              alt="No orders"
            />
            <p style={{ color: "#64748B", fontFamily: f, fontSize: 14 }}>
              No finished orders
            </p>
          </div>
        )}
      </div>
    </TabPanel>
  );
}
