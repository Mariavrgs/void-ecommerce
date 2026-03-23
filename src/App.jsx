import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";

import "./styles/global.css";

function AppInner() {
  const [page, setPage] = useState("home");
  const [product, setProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { notification } = useCart();

  return (
    <div className="void-app">
      <Navbar page={page} setPage={setPage} setCartOpen={setCartOpen} />

      {page === "home" && (
        <HomePage
          setPage={setPage}
          setProduct={setProduct}
          setCartOpen={setCartOpen}
        />
      )}

      {page === "product" && product && (
        <ProductPage product={product} setPage={setPage} />
      )}

      {page === "checkout" && (
        <CheckoutPage setPage={setPage} />
      )}

      {cartOpen && (
        <Cart
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setPage("checkout"); }}
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
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
