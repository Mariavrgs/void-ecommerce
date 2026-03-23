import { useState, useEffect } from "react";
import "../styles/navbar.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar({ page, setPage, setCartOpen }) {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on page change
  useEffect(() => { setMenuOpen(false); }, [page]);

  const NAV_LINKS = [
    { label: "Início",      key: "home" },
    { label: "Coleção",     key: "home", anchor: "products" },
    { label: "Favoritos",   key: "wishlist" },
  ];

  const handleNav = (link) => {
    setPage(link.key);
    if (link.anchor) {
      setTimeout(() => {
        const el = document.getElementById(link.anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar-logo" onClick={() => setPage("home")}>
          VOID<span>.</span>
        </div>

        {/* Desktop nav */}
        <div className="navbar-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              className={`nav-link ${page === link.key && link.key !== "home" || (page === "home" && link.key === "home" && !link.anchor) ? "active" : ""}`}
              onClick={() => handleNav(link)}
            >
              {link.label}
              {link.key === "wishlist" && wishCount > 0 && (
                <span className="nav-badge">{wishCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="navbar-actions">
          <button
            className="icon-btn wishlist-nav-btn"
            onClick={() => setPage("wishlist")}
            title="Favoritos"
            aria-label="Favoritos"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={wishCount > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishCount > 0 && <span className="icon-badge">{wishCount}</span>}
          </button>

          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            CARRINHO
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-inner">
            {NAV_LINKS.map((link) => (
              <button key={link.label} className="mobile-nav-link" onClick={() => handleNav(link)}>
                {link.label}
                {link.key === "wishlist" && wishCount > 0 && (
                  <span className="nav-badge">{wishCount}</span>
                )}
              </button>
            ))}
            <button className="mobile-nav-link mobile-cart-link" onClick={() => { setCartOpen(true); setMenuOpen(false); }}>
              Carrinho {count > 0 && <span className="nav-badge">{count}</span>}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
