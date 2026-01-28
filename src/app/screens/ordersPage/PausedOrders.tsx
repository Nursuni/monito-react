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

/** REDUX SELECTOR */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
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
        "Do you want to proceed with payment?",
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
      <div className="space-y-5">
        {pausedOrders?.map((order: Order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            {/* Product List Section */}
            <div className="p-5">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Order Items
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product = order.productData.filter(
                    (ele: Product) => ele._id === item.productId,
                  )[0];

                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {/* Product Image */}
                      <img
                        src={imagePath}
                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        alt={product.productName}
                      />

                      {/* Product Name */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {product.productName}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.itemPrice} each
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-gray-500 text-xs">Qty</p>
                          <p className="font-semibold text-gray-900">
                            {item.itemQuantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-xs">Subtotal</p>
                          <p className="font-bold text-gray-900">
                            ${item.itemQuantity * item.itemPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Summary & Actions Section */}
            <div className="bg-gray-50 p-5">
              {/* Price Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product Cost</span>
                  <span className="font-medium text-gray-900">
                    ${order.orderTotal - order.orderDelivery}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    ${order.orderDelivery}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">
                      ${order.orderTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  value={order._id}
                  onClick={deleteOrderHandler}
                  className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  value={order._id}
                  onClick={processOrderHandler}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <img
                src={"/icons/noimage-list.svg"}
                className="w-48 h-48 opacity-40 mb-4"
                alt="No orders"
              />
              <p className="text-gray-500 text-center">
                No paused orders found
              </p>
            </div>
          ))}
      </div>
    </TabPanel>
  );
}
