import { createContext, useContext, useState } from "react";
import { products } from "../assets/assets";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  function updateCartItems(productId, productSize, type) {

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === productId && item.size === productSize
    );

      { /* ----- Add product in the Cart ----- */ }
      if (type === "addToCart") {
        if (existingItem) {
          return prev.map((item) =>
            item.id === productId && item.size === productSize
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          return [...prev, { id: productId, size:productSize, quantity: 1}];
        }
      }

      { /* ----- remove product from the Cart ----- */ }
      if (type === "removeProduct") {
        if (!existingItem) return prev;

        // If quantity is 1 → remove item completely
        if (existingItem.quantity === 1) {
          return prev.filter((item) => !(item.id === productId && item.size === productSize));
        }

        // Otherwise → decrease quantity
        return prev.map((item) =>
          item.id === productId && item.size === productSize
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
    });
  }

//get total count or cart products
const totalProductQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,0
)
const productQuantityLabel = (`${totalProductQuantity}`) ;

//get total amount of cart items

const getTotalCartAmount = () => {
   return cartItems.reduce(
    (total,cartItem) => {
        const productData = products.find((product) => product._id === cartItem.id);

        if(!productData) return total;

        const totalAmount = total + productData.price * cartItem.quantity;
        return totalAmount;
    }, 0);
};



  const cartValue = {
    cartItems,
    updateCartItems,
    productQuantityLabel,
    getTotalCartAmount
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartContextProvider");
  }
  return context;
}
