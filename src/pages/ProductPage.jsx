import { useState } from "react";
import "../styles/productPage.css";
import { useCart } from "../context/CartContext";
import ProductVisual from "../components/ProductVisual";

export default function ProductPage({ product, setPage }) {
  const { add } = useCart();
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const handleAdd = () => {
    if (!size) return;
    add(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  // Simulate 3 gallery angles by rotating the gradient
  const variants = [0, 1, 2].map((i) => ({
    ...product,
    gradient: product.gradient.replace("135deg", `${135 + i * 90}deg`),
  }));

  return (
    <div className="page-enter">
      <div className="product-page">
        {/* ── Gallery ── */}
        <div className="product-gallery">
          <div className="gallery-main">
            <ProductVisual product={variants[activeImg]} />
          </div>
          <div className="gallery-thumbs">
            {variants.map((v, i) => (
              <div
                key={i}
                className={`gallery-thumb ${activeImg === i ? "active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <ProductVisual product={v} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="product-info">
          <div className="product-breadcrumb" onClick={() => setPage("home")}>
            ← VOLTAR PARA PRODUTOS
          </div>

          {product.tag && (
            <div className="product-tag" style={{ display: "inline-block", marginBottom: 16 }}>
              {product.tag}
            </div>
          )}

          <h1 className="product-name">{product.name}</h1>

          <div className="product-price-row">
            <div className="product-price">R$ {product.price}</div>
          </div>

          <p className="product-desc">{product.description}</p>

          <div className="size-label">Selecione o tamanho</div>
          <div className="size-grid">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={`size-btn ${size === s ? "active" : ""}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            className={`btn-add-large ${added ? "added" : ""}`}
            onClick={handleAdd}
            disabled={!size}
          >
            {added ? "✓ ADICIONADO!" : !size ? "SELECIONE UM TAMANHO" : "ADICIONAR AO CARRINHO"}
          </button>

          <button className="btn-ghost" style={{ width: "100%" }}>
            COMPRAR AGORA
          </button>

          <div className="product-meta">
            <div className="meta-item"><label>Material</label><span>100% Algodão Premium</span></div>
            <div className="meta-item"><label>Entrega</label><span>3–7 dias úteis</span></div>
            <div className="meta-item"><label>Troca</label><span>30 dias grátis</span></div>
            <div className="meta-item"><label>SKU</label><span>VD-{String(product.id).padStart(4, "0")}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
