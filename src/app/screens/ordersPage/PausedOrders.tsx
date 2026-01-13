import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack, Typography } from "@mui/material";
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

/** REDUX SELECTOR */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, orderBuilder, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /**HANDLERS */
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
        console.log("=========GOOOOOOOD:", orderBuilder);
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      //PAYMENT PROCESS
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you want to proceed with payment?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        // => PROCESS ORDER
        setValue("2");
        setOrderBuilder(new Date());
        console.log("orderBuilder:", orderBuilder);
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => (
          <Box
            key={order._id}
            className="order-main-box"
            display="flex"
            flexDirection="column"
          >
            {/* Dish list */}
            <Box
              className="order-box-scroll"
              display="flex"
              flexDirection="column"
            >
              {order?.orderItems?.map((item: OrderItem) => {
                const product = order.productData.filter(
                  (ele: Product) => ele._id === item.productId
                )[0];

                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <Box
                    key={item._id}
                    className="orders-name-price"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <img
                      src={imagePath}
                      className="order-dish-img"
                      alt={product.productName}
                    />

                    <p className="title-dish">{product.productName}</p>

                    <Box
                      className="price-box"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <p>${item.itemPrice}</p>
                      <img src="/icons/close.svg" className="order-icon" />
                      <p>{item.itemQuantity}</p>
                      <img src="/icons/pause.svg" className="order-icon" />
                      <p>${item.itemQuantity * item.itemPrice}</p>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Total price */}
            <Box className="total-price-box">
              <Box
                className="total-price-line"
                display="flex"
                alignItems="center"
                gap={2}
                ml={4}
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
              </Box>

              <Box display="flex" gap={2}>
                <Button
                  value={order._id}
                  variant="contained"
                  className="cancel-btn"
                  onClick={deleteOrderHandler}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#D2B68C",
                    color: "#343434",
                    "&:hover": { backgroundColor: "#C8A97C" },
                  }}
                >
                  Cancel
                </Button>

                <Button
                  value={order._id}
                  variant="contained"
                  className="payment-btn"
                  onClick={processOrderHandler}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#4caf50",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#45a049" },
                  }}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
        {!pausedOrders ||
          (pausedOrders.length === 0 && (
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
