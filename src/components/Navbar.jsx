import "../styles/navbar.css";
import { useCart } from "../context/CartContext";

export default function Navbar({ page, setPage, setCartOpen }) {
  const { count } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => setPage("home")}>
        VOID<span>.</span>
      </div>

      <div className="navbar-nav">
        {["home", "coleção", "sobre", "contato"].map((p) => (
          <button
            key={p}
            className={`nav-link ${page === p ? "active" : ""}`}
            onClick={() => (p === "home" ? setPage("home") : null)}
          >
            {p}
          </button>
        ))}
      </div>

      <button className="cart-btn" onClick={() => setCartOpen(true)}>
        CARRINHO
        {count > 0 && <span className="cart-count">{count}</span>}
      </button>
    </nav>
  );
}
