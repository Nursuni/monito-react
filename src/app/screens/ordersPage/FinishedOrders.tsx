import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { retrieveFinishedOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { Order, OrderItem } from "../../../lib/types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

/** REDUX SELECTOR */
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders }),
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <div className="space-y-5">
        {finishedOrders?.map((order: Order) => (
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
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id,
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

            {/* Summary Section */}
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

              {/* Date & Status */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  {moment().format("YY-MM-DD HH:mm")}
                </span>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 font-medium text-sm rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <img
                src={"/icons/noimage-list.svg"}
                className="w-48 h-48 opacity-40 mb-4"
                alt="No orders"
              />
              <p className="text-gray-500 text-center">No finished orders</p>
            </div>
          ))}
      </div>
    </TabPanel>
  );
}
