import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Messages, serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders }),
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

const f = "'Plus Jakarta Sans', sans-serif";

export default function ProcessOrders({ setValue }: ProcessOrdersProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.FINISH,
      };
      if (window.confirm("Have you received your order?")) {
        await new OrderService().updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"} style={{ padding: 0 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontFamily: f,
        }}
      >
        {processOrders?.map((order: Order) => (
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

              {/* Date & Action */}
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
                <button
                  value={order._id}
                  onClick={finishOrderHandler}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 10,
                    border: "none",
                    background: "#2563EB",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: f,
                    boxShadow: "0 4px 12px rgba(37,99,235,0.28)",
                  }}
                >
                  Verify to Fulfil
                </button>
              </div>
            </div>
          </div>
        ))}

        {(!processOrders || processOrders.length === 0) && (
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
              No orders in process
            </p>
          </div>
        )}
      </div>
    </TabPanel>
  );
}
