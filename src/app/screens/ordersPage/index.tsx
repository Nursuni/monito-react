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

/** REDUX */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: any[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: any[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: any[]) => dispatch(setFinishedOrders(data)),
});

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
    <div className="min-h-screen bg-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT — ORDERS */}
          <div className="lg:col-span-2">
            <TabContext value={value}>
              {/* TABS */}
              <Box className="flex justify-center mb-8">
                <Tabs
                  value={value}
                  onChange={(e, v) => setValue(v)}
                  TabIndicatorProps={{ style: { display: "none" } }}
                  className="border border-gray-200 rounded-full"
                >
                  {["Paused", "Processing", "Finished"].map((label, i) => {
                    const val = String(i + 1);
                    return (
                      <Tab
                        key={val}
                        value={val}
                        label={label}
                        className={`px-6 py-2 text-sm font-semibold rounded-full transition
                          ${
                            value === val
                              ? "bg-black text-white"
                              : "text-gray-500"
                          }`}
                      />
                    );
                  })}
                </Tabs>
              </Box>

              {/* CONTENT — NO BACKGROUND */}
              <div className="space-y-6">
                {value === "1" && <PausedOrders setValue={setValue} />}
                {value === "2" && <ProcessOrders setValue={setValue} />}
                {value === "3" && <FinishedOrders />}
              </div>
            </TabContext>
          </div>

          {/* RIGHT — USER & PAYMENT */}
          <div className="space-y-8">
            {/* USER CARD */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="relative w-32 h-32 mx-auto">
                <img
                  src={
                    authMember.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-use.svg"
                  }
                  className="w-full h-full rounded-full object-cover"
                />

                {/* ADDRESS ON IMAGE */}
                <div className="absolute bottom-0 w-full bg-black/60 text-white text-[11px] text-center py-1 rounded-b-full">
                  {authMember.memberAddress || "no address"}
                </div>

                {/* BADGE */}
                <img
                  src={
                    authMember.memberType === MemberType.ADMIN
                      ? "/icons/restaurant-badge.svg"
                      : "/icons/user-badge.svg"
                  }
                  className="absolute -bottom-2 -right-2 w-7 h-7"
                />
              </div>

              <div className="text-center mt-4">
                <p className="font-semibold text-gray-900">
                  {authMember.memberNick}
                </p>
                <p className="text-xs text-gray-500">{authMember.memberType}</p>
              </div>
            </div>

            {/* PAYMENT CARD — WHITE & MODERN */}
            <div className="border border-gray-200 rounded-2xl p-6 space-y-4">
              <TextField label="Cardholder name" fullWidth variant="outlined" />
              <TextField
                label="Card number"
                fullWidth
                inputProps={{ maxLength: 16 }}
              />

              <div className="flex gap-3">
                <TextField label="MM / YY" fullWidth />
                <TextField label="CVV" fullWidth />
              </div>

              <div className="flex justify-between pt-4">
                <img src="/icons/visa-card.svg" className="h-6" />
                <img src="/icons/master-card.svg" className="h-6" />
                <img src="/icons/paypal-card.svg" className="h-6" />
                <img src="/icons/western-card.svg" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
