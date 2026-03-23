import { useState } from "react";
import "../styles/home.css";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Footer from "../components/Footer";

export default function HomePage({ setPage, setCartOpen }) {
  const { add } = useCart();
  const [cat, setCat] = useState("todos");
  const [sort, setSort] = useState("popular");
  const [priceMax, setPriceMax] = useState(1500);

  const filtered = PRODUCTS
    .filter((p) => cat === "todos" || p.category === cat)
    .filter((p) => p.price <= priceMax)
    .sort((a, b) => {
      if (sort === "asc")  return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return (b.tag ? 1 : 0) - (a.tag ? 1 : 0);
    });

  const handleView = (p) => setPage("product", p);
  const handleAdd  = (p, size) => add(p, size);

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
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
          <div className="hero-visual-center">
            <div className="hero-big-v">V</div>
            <div className="hero-season">SS25 Collection</div>
          </div>
          <div className="hero-badge">New Drop</div>
          <div className="hero-stats">
            <div className="hero-stat"><span>16+</span><label>Produtos</label></div>
            <div className="hero-stat-div"/>
            <div className="hero-stat"><span>6</span><label>Categorias</label></div>
            <div className="hero-stat-div"/>
            <div className="hero-stat"><span>Free</span><label>Shipping</label></div>
          </div>
        </div>
      </section>

      {/* ── Category quick nav ── */}
      <div className="cat-strip" id="products">
        {["camisetas","hoodies","calças","bonés","tênis"].map((c) => (
          <button
            key={c}
            className={`cat-strip-btn ${cat === c ? "active" : ""}`}
            onClick={() => { setCat(c); document.getElementById("product-grid").scrollIntoView({ behavior: "smooth" }); }}
          >
            {CAT_ICONS[c]} {c}
          </button>
        ))}
      </div>

      {/* ── Filters ── */}
      <Filters
        cat={cat} setCat={setCat}
        sort={sort} setSort={setSort}
        priceMax={priceMax} setPriceMax={setPriceMax}
      />

      {/* ── Products Grid ── */}
      <div className="products-section" id="product-grid">
        <div className="section-header">
          <h2 className="section-title">
            {cat === "todos" ? "PRODUTOS" : cat.toUpperCase()}
          </h2>
          <span className="section-count">{filtered.length} {filtered.length === 1 ? "item" : "itens"}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◻</div>
            <p className="empty-text">Nenhum produto encontrado</p>
            <button className="btn-ghost" onClick={() => { setCat("todos"); setPriceMax(1500); }}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onView={handleView} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

const CAT_ICONS = {
  camisetas: "👕",
  hoodies: "🧥",
  calças: "👖",
  bonés: "🧢",
  tênis: "👟",
};
