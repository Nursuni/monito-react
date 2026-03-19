import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

const f = "'Plus Jakarta Sans', sans-serif";

export default function PausedOrders({ setValue }: PausedOrdersProps) {
  const { authMember, orderBuilder, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.DELETE,
      };
      if (window.confirm("Do you want to delete the order?")) {
        await new OrderService().updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.PROCESS,
      };
      if (window.confirm("Do you want to proceed with payment?")) {
        await new OrderService().updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"} style={{ padding: 0 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontFamily: f,
        }}
      >
        {pausedOrders?.map((order: Order) => (
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
                  const product = order.productData.filter(
                    (ele: Product) => ele._id === item.productId,
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

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  value={order._id}
                  onClick={deleteOrderHandler}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: 10,
                    border: "1.5px solid #E2E8F0",
                    background: "white",
                    color: "#64748B",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: f,
                    transition: "all 0.18s",
                  }}
                >
                  Cancel
                </button>
                <button
                  value={order._id}
                  onClick={processOrderHandler}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
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
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        ))}

        {(!pausedOrders || pausedOrders.length === 0) && (
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
              No paused orders found
            </p>
          </div>
        )}
      </div>
    </TabPanel>
  );
}
