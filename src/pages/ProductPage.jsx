import { useState } from "react";
import "../styles/productPage.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductVisual from "../components/ProductVisual";

export default function ProductPage({ product, setPage }) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const isWished = has(product.id);

  const handleAdd = () => {
    if (!size) return;
    add(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  // Gallery: real image + 2 gradient variants as fallback
  const realImgs = [product.img, product.imgHover].filter(Boolean);
  const variantGradients = [
    product.gradient,
    product.gradient.replace("135deg","225deg"),
    product.gradient.replace("135deg","315deg"),
  ];

  const galleryCount = 3;

  const renderGalleryImg = (i, isMain = false) => {
    const imgSrc = realImgs[i];
    const hasError = imgErrors[i];
    const variant = { ...product, gradient: variantGradients[i] || variantGradients[0] };
    const h = isMain ? 480 : 140;

    if (imgSrc && !hasError) {
      return (
        <img
          src={imgSrc}
          alt={`${product.name} ${i + 1}`}
          style={{ width: "100%", height: h, objectFit: "cover", display: "block" }}
          loading="lazy"
          onError={() => setImgErrors(e => ({ ...e, [i]: true }))}
        />
      );
    }
    return <ProductVisual product={variant} size={isMain ? "full" : "sm"} />;
  };

  return (
    <div className="page-enter">
      <div className="product-page">
        {/* ── Gallery ── */}
        <div className="product-gallery">
          <div className="gallery-main" style={{ overflow: "hidden", borderRadius: "var(--radius)" }}>
            {renderGalleryImg(activeImg, true)}
          </div>
          <div className="gallery-thumbs">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`gallery-thumb ${activeImg === i ? "active" : ""}`}
                onClick={() => setActiveImg(i)}
                style={{ overflow: "hidden" }}
              >
                {renderGalleryImg(i)}
              </div>
            ))}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="product-info">
          <div className="product-breadcrumb" onClick={() => setPage("home")}>
            ← VOLTAR PARA PRODUTOS
          </div>

          <div className="product-top-row">
            {product.tag && (
              <div className="product-tag">{product.tag}</div>
            )}
            <button
              className={`wish-btn ${isWished ? "wished" : ""}`}
              onClick={() => toggle(product.id)}
              title={isWished ? "Remover dos favoritos" : "Salvar nos favoritos"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill={isWished ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="1.8"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {isWished ? "Salvo" : "Salvar"}
            </button>
          </div>

          <h1 className="product-name">{product.name}</h1>

          <div className="product-price-row">
            <div className="product-price">R$ {product.price.toLocaleString("pt-BR")}</div>
            <div className="product-installments">
              ou 3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")} sem juros
            </div>
          </div>

          <p className="product-desc">{product.description}</p>

          <div className="size-label">
            Selecione o tamanho
            {size && <span className="size-selected">— {size}</span>}
          </div>
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
            {added ? "✓ ADICIONADO AO CARRINHO!" : !size ? "SELECIONE UM TAMANHO" : "ADICIONAR AO CARRINHO"}
          </button>

          <button className="btn-ghost" style={{ width: "100%", marginTop: 8 }}>
            COMPRAR AGORA
          </button>

          {/* Product details */}
          <div className="product-details">
            <details className="detail-item">
              <summary>Detalhes do produto</summary>
              <div className="detail-content">
                <p>Material: {product.material}</p>
                <p>Modelagem: {product.fit}</p>
                <p>SKU: VD-{String(product.id).padStart(4, "0")}</p>
              </div>
            </details>
            <details className="detail-item">
              <summary>Entrega e devoluções</summary>
              <div className="detail-content">
                <p>Frete grátis para todo o Brasil acima de R$ 299</p>
                <p>Prazo: 3–7 dias úteis</p>
                <p>Troca e devolução em até 30 dias</p>
              </div>
            </details>
            <details className="detail-item">
              <summary>Cuidados com a peça</summary>
              <div className="detail-content">
                <p>Lavar a 30°C, não usar secadora</p>
                <p>Não torcer, secar à sombra</p>
                <p>Não usar alvejante</p>
              </div>
            </details>
          </div>

          <div className="product-meta">
            <div className="meta-item"><label>Material</label><span>{product.material}</span></div>
            <div className="meta-item"><label>Modelagem</label><span>{product.fit}</span></div>
            <div className="meta-item"><label>Entrega</label><span>3–7 dias úteis</span></div>
            <div className="meta-item"><label>Troca</label><span>30 dias grátis</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
