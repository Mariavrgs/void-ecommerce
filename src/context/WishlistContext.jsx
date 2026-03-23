import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("void_wishlist") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("void_wishlist", JSON.stringify(ids));
  }, [ids]);

  const toggle = (id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const has = (id) => ids.includes(id);
  const count = ids.length;

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, count }}>
      {children}
    </WishlistContext.Provider>
  );
}
