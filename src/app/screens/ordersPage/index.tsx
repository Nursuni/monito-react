import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SyntheticEvent, useEffect, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import Divider from "../../components/divider";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });
  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrder({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);
  /** HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container className="order-container" sx={{ mb: 10 }}>
        <Stack className="order-left">
          <TabContext value={value}>
            {/* Tabs header */}
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="order tabs"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>

            {/* Tab content */}
            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-page-right"}>
          <Box className={"order-info-box"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <div className={"order-user-img"}>
                <img src={"/img/justin.webp"} className={"order-user-avatar"} />
                <div className={"order-user-icon-box"}>
                  <img src={"/icons/user-badge.svg"} />
                </div>
              </div>
              <span className={"order-user-name"}>
                {authMember?.memberNick}
              </span>
              <span className={"order-user-prof"}>
                {authMember?.memberType}
              </span>
            </Box>
            <Divider width="332" height="1" bg="#A1A1A1" />
            <Box className="order-user-desc">
              <img
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-use.svg"
                }
              />
              <img
                src={
                  authMember?.memberType === MemberType.ADMIN
                    ? "/icons/restaurant-badge.svg"
                    : "/icons/user-badge.svg"
                }
              />
              <p className="user-desc" style={{ margin: 0, marginLeft: "6px" }}>
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "no address"}
              </p>
            </Box>
          </Box>

          <Box className={"order-payment-box"}>
            <Stack spacing={2}>
              <TextField label="Cardholder Name" variant="outlined" fullWidth />
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 16 }}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Expiry Date"
                  placeholder="MM/YY"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 5 }}
                />
                <TextField
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 3 }}
                />
              </Stack>
              <Box className={"user-media-box"}>
                <img src="/icons/western-card.svg" />
                <img src="/icons/master-card.svg" />
                <img src="/icons/paypal-card.svg" />
                <img src="/icons/visa-card.svg" />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
