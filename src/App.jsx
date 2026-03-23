import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";

import "./styles/global.css";

function AppInner() {
  const [page, setPage] = useState("home");
  const [product, setProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { notification } = useCart();

  const navigate = (p, prod = null) => {
    if (prod) setProduct(prod);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="void-app">
      <Navbar page={page} setPage={navigate} setCartOpen={setCartOpen} />

      {page === "home" && (
        <HomePage setPage={navigate} setCartOpen={setCartOpen} />
      )}
      {page === "product" && product && (
        <ProductPage product={product} setPage={navigate} />
      )}
      {page === "checkout" && (
        <CheckoutPage setPage={navigate} />
      )}
      {page === "wishlist" && (
        <WishlistPage setPage={navigate} />
      )}

      {cartOpen && (
        <Cart
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); navigate("checkout"); }}
        />
      )}

      {notification && (
        <div className="notification">{notification}</div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </WishlistProvider>
  );
}
