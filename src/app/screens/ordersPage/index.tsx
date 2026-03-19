import { Box, Container, Stack, TextField, Tabs, Tab } from "@mui/material";
import { TabContext } from "@mui/lab";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";

import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: any[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: any[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: any[]) => dispatch(setFinishedOrders(data)),
});

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .orders-root, .orders-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .orders-root {
      --blue-50: #EFF6FF;
      --blue-100: #DBEAFE;
      --blue-200: #BFDBFE;
      --blue-500: #3B82F6;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
      --ink: #0F172A;
      --muted: #64748B;
      --border: #E2E8F0;
    }
  `}</style>
);

export default function OrdersPage() {
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then(setPausedOrders)
      .catch(() => {});
    order
      .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then(setProcessOrders)
      .catch(() => {});
    order
      .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then(setFinishedOrders)
      .catch(() => {});
  }, [orderBuilder]);

  if (!authMember) {
    history.push("/");
    return null;
  }

  return (
    <div
      className="orders-root"
      style={{ minHeight: "100vh", background: "white" }}
    >
      <FontStyle />
      <Container style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 40,
              alignItems: "start",
            }}
          >
            {/* LEFT — ORDERS */}
            <div>
              <TabContext value={value}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 32,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      border: "1.5px solid var(--border)",
                      borderRadius: 999,
                      overflow: "hidden",
                      padding: 4,
                      gap: 4,
                    }}
                  >
                    {["Paused", "Processing", "Finished"].map((label, i) => {
                      const val = String(i + 1);
                      const active = value === val;
                      return (
                        <button
                          key={val}
                          onClick={() => setValue(val)}
                          style={{
                            padding: "8px 24px",
                            borderRadius: 999,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 700,
                            fontFamily: "inherit",
                            background: active ? "var(--ink)" : "transparent",
                            color: active ? "white" : "var(--muted)",
                            transition: "all 0.18s ease",
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </Box>

                <div>
                  {value === "1" && <PausedOrders setValue={setValue} />}
                  {value === "2" && <ProcessOrders setValue={setValue} />}
                  {value === "3" && <FinishedOrders />}
                </div>
              </TabContext>
            </div>

            {/* RIGHT — USER & PAYMENT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* USER CARD */}
              <div
                style={{
                  border: "1.5px solid var(--border)",
                  borderRadius: 20,
                  padding: 24,
                  background: "white",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 112,
                    height: 112,
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={
                      authMember.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-use.svg"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      fontSize: 10,
                      textAlign: "center",
                      padding: "3px 0",
                      borderBottomLeftRadius: 56,
                      borderBottomRightRadius: 56,
                      fontFamily: "inherit",
                    }}
                  >
                    {authMember.memberAddress || "no address"}
                  </div>
                  <img
                    src={
                      authMember.memberType === MemberType.ADMIN
                        ? "/icons/restaurant-badge.svg"
                        : "/icons/user-badge.svg"
                    }
                    style={{
                      position: "absolute",
                      bottom: -8,
                      right: -8,
                      width: 28,
                      height: 28,
                    }}
                  />
                </div>
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <p
                    style={{
                      fontWeight: 700,
                      color: "var(--ink)",
                      margin: "0 0 4px",
                      fontSize: 15,
                    }}
                  >
                    {authMember.memberNick}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                    }}
                  >
                    {authMember.memberType}
                  </p>
                </div>
              </div>

              {/* PAYMENT CARD */}
              <div
                style={{
                  border: "1.5px solid var(--border)",
                  borderRadius: 20,
                  padding: 24,
                  background: "white",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <style>{`
                  .pay-label {
                    display: block;
                    font-size: 11px;
                    font-weight: 700;
                    color: #64748B;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 5px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                  }
                  .pay-input {
                    width: 100%;
                    padding: 10px 14px;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 10px;
                    font-size: 13px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-weight: 500;
                    color: #0F172A;
                    outline: none;
                    background: white;
                    transition: border-color 0.18s;
                    box-sizing: border-box;
                  }
                  .pay-input::placeholder { color: #94A3B8; }
                  .pay-input:focus { border-color: #2563EB; }
                `}</style>

                <p
                  style={{
                    fontWeight: 700,
                    color: "var(--ink)",
                    margin: "0 0 4px",
                    fontSize: 15,
                  }}
                >
                  Payment Details
                </p>

                <div>
                  <label className="pay-label">Cardholder Name</label>
                  <input className="pay-input" placeholder="John Smith" />
                </div>

                <div>
                  <label className="pay-label">Card Number</label>
                  <input
                    className="pay-input"
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                  />
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label className="pay-label">MM / YY</label>
                    <input className="pay-input" placeholder="08 / 26" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="pay-label">CVV</label>
                    <input
                      className="pay-input"
                      placeholder="•••"
                      maxLength={3}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 6,
                  }}
                >
                  <img src="/icons/visa-card.svg" style={{ height: 24 }} />
                  <img src="/icons/master-card.svg" style={{ height: 24 }} />
                  <img src="/icons/paypal-card.svg" style={{ height: 24 }} />
                  <img src="/icons/western-card.svg" style={{ height: 24 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
