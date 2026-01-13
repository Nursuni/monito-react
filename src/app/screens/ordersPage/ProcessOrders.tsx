import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack, Typography } from "@mui/material";
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

/** REDUX SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}
export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      //PAYMENT PROCESS
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you recieved your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        // => PROCESS ORDER
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => (
          <Box
            key={order._id}
            className={"order-main-box"}
            display="flex"
            flexDirection="column"
          >
            <Box
              className={"order-box-scroll"}
              display="flex"
              flexDirection="column"
            >
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order.productData.filter(
                  (ele: Product) => item.productId === ele._id
                )[0];

                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <Box
                    key={item._id}
                    className={"orders-name-price"}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <img src={imagePath} className={"order-dish-img"} />

                    <p className={"title-dish"}>{product.productName}</p>

                    <Box
                      className={"price-box"}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <p>${item.itemPrice}</p>
                      <img src={"/icons/close.svg"} />
                      <p>{item.itemQuantity}</p>
                      <img src={"/icons/pause.svg"} />
                      <p style={{ marginLeft: "15px" }}>
                        ${item.itemQuantity * item.itemPrice}
                      </p>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box className={"total-price-box"}>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                ml={4}
                className="box-total"
              >
                <Typography>Product cost:</Typography>
                <Typography>
                  ${order.orderTotal - order.orderDelivery}
                </Typography>

                <img src="/icons/plus.svg" className="order-icon" />

                <Typography>Delivery cost:</Typography>
                <Typography>${order.orderDelivery}</Typography>

                <img src="/icons/pause.svg" className="order-icon" />

                <Typography>Total:</Typography>
                <Typography>${order.orderTotal}</Typography>
                <p className={"data-comp"}>
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
              </Box>

              <Button
                value={order._id}
                variant="contained"
                className={"verify-button"}
                onClick={finishOrderHandler}
                sx={{
                  borderRadius: "10px",
                  mr: 2,
                  backgroundColor: "#3A87CB",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#2E6AB3",
                  },
                }}
              >
                Verify to Fulfil
              </Button>
            </Box>
          </Box>
        ))}

        {!processOrders ||
          (processOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
