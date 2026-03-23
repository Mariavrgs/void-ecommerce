import { useState } from "react";
import "../styles/home.css";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Footer from "../components/Footer";

export default function HomePage({ setPage, setProduct, setCartOpen }) {
  const { add } = useCart();
  const [cat, setCat] = useState("todos");
  const [sort, setSort] = useState("popular");
  const [priceMax, setPriceMax] = useState(1000);

  const filtered = PRODUCTS
    .filter((p) => cat === "todos" || p.category === cat)
    .filter((p) => p.price <= priceMax)
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return (b.tag ? 1 : 0) - (a.tag ? 1 : 0);
    });

  const handleView = (p) => { setProduct(p); setPage("product"); };
  const handleAdd  = (p, size) => add(p, size);

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className="hero">
        <div>
          <div className="hero-label">Coleção SS25</div>
          <h1 className="hero-title">
            FEITO<br />PARA<br /><em>OUSAR</em>
          </h1>
          <p className="hero-desc">
            Streetwear de alta qualidade para quem não aceita o ordinário.
            Cada peça é uma declaração.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
            >
              VER COLEÇÃO
            </button>
            <button className="btn-ghost" onClick={() => setCartOpen(true)}>
              MEU CARRINHO
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-marquee">VOID VOID VOID VOID VOID VOID </div>
          <div style={{ position: "absolute", zIndex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 120, lineHeight: 1, color: "var(--text)", opacity: 0.9 }}>
              V
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>
              SS25 Collection
            </div>
          </div>
          <div className="hero-badge">New Drop</div>
        </div>
      </section>

      {/* ── Filters ── */}
      <Filters
        cat={cat} setCat={setCat}
        sort={sort} setSort={setSort}
        priceMax={priceMax} setPriceMax={setPriceMax}
      />

      {/* ── Products Grid ── */}
      <div className="products-section">
        <div className="section-header">
          <h2 className="section-title">PRODUTOS</h2>
          <span className="section-count">{filtered.length} items</span>
        </div>
        <div className="products-grid">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onView={handleView}
              onAdd={handleAdd}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
