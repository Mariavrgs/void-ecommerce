import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("void_cart") || "[]");
    } catch {
      return [];
    }
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem("void_cart", JSON.stringify(items));
  }, [items]);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2200);
  };

  const add = (product, size) => {
    setItems((prev) => {
      const key = `${product.id}-${size}`;
      const exists = prev.find((i) => i.key === key);
      if (exists) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, size, qty: 1, key }];
    });
    notify(`${product.name} adicionado`);
  };

  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));

  const updateQty = (key, qty) => {
    if (qty < 1) return remove(key);
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty } : i)));
  };

  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, total, count, notification }}>
      {children}
    </CartContext.Provider>
  );
}
