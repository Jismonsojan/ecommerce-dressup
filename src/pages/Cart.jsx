import React from "react";
import Title from "../components/Title";
import { useCart } from "../context/CartContext";
import { assets, products } from "../assets/assets";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { CartTotal } from "../components/CartTotal";

const Cart = () => {
  const { cartItems, updateCartItems } = useCart();
  const { currency } = useShop();
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item.id,
              );
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={productData.image[0]}
                      alt=""
                      className="w-16 sm:w-20"
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency}
                          {productData.price}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-100">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = Number(e.target.value);
                      if (newQty > item.quantity) {
                        updateCartItems(item.id, item.size, "addToCart");
                      } else if (newQty < item.quantity) {
                        updateCartItems(item.id, item.size, "removeProduct");
                      }
                    }}
                    className="border max-w-10 sm:max-w-20 px-1 py-1"
                  />
                  <img
                    onClick={() =>
                      updateCartItems(item.id, item.size, "removeProduct")
                    }
                    src={assets.bin_icon}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    alt=""
                  />
                </div>
              );
            })}
            <div className="flex justify-end my-20">
              <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                   <Link to="/place-order">
                   <button className="border bg-black text-white text-sm my-8 px-8 py-3 hover:bg-white hover:text-black cursor-pointer">PROCEED TO CHECKOUT</button>
                   </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p>Your Cart Is Empty</p>
            <Link to="/collection">
              <button className="border bg-black text-white text-sm my-8 px-8 py-3 hover:bg-white hover:text-black cursor-pointer">
                Go To Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
