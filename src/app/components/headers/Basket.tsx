import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, orderBuilder, setOrderBuilder } = useGlobals();
  const history = useHistory();

  const itemsPrice = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  );
  const shippingCost = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);
      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box>
      {/* CART ICON */}
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={cartItems.length}
          color="secondary"
          sx={{
            "& .MuiBadge-badge": {
              minWidth: 20,
              height: 22,
              fontSize: 14,
            },
          }}
        >
          <img src="/icons/cart-icon-cat.png" alt="cart" className="w-7 h-7" />
        </Badge>
      </IconButton>

      {/* DROPDOWN */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            borderRadius: "14px",
            width: 360,
            mt: 1.5,
            p: 0,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Stack className="p-4 space-y-4">
          {/* HEADER */}
          <Box className="flex justify-between items-center border-b pb-2">
            <p className="font-semibold text-gray-800">Your Cart</p>
            {cartItems.length > 0 && (
              <DeleteForeverIcon
                className="cursor-pointer text-red-500 hover:text-red-600"
                onClick={onDeleteAll}
              />
            )}
          </Box>

          {/* ITEMS */}
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400 py-6">Cart is empty</p>
          ) : (
            <Box className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box
                    key={item._id}
                    className="flex gap-3 items-center bg-gray-50 rounded-xl p-3 relative"
                  >
                    <CancelIcon
                      onClick={() => onDelete(item)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
                      fontSize="small"
                    />

                    <img
                      src={imagePath}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />

                    <Box className="flex-1">
                      <p className="font-semibold text-sm text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item.price} × {item.quantity}
                      </p>

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => onRemove(item)}
                          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
                        >
                          −
                        </button>
                        <button
                          onClick={() => onAdd(item)}
                          className="w-7 h-7 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
                        >
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* FOOTER */}
          {cartItems.length > 0 && (
            <Box className="border-t pt-4 space-y-3">
              <p className="font-semibold text-gray-800 text-sm">
                Total: ${totalPrice}
                <span className="text-gray-400 font-normal">
                  {" "}
                  (${itemsPrice} + {shippingCost})
                </span>
              </p>

              <Button
                fullWidth
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                className="!bg-blue-600 hover:!bg-blue-700 !rounded-xl !py-2.5 !font-semibold"
                variant="contained"
              >
                Order Now
              </Button>
            </Box>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
