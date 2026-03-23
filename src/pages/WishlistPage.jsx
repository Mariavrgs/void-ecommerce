import "../styles/wishlist.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import { useState } from "react";

export default function WishlistPage({ setPage }) {
  const { ids, toggle } = useWishlist();
  const { add } = useCart();
  const [imgErrors, setImgErrors] = useState({});

  const wishItems = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="page-enter wishlist-page">
      <div className="wishlist-header">
        <div className="wishlist-header-inner">
          <div className="wishlist-breadcrumb" onClick={() => setPage("home")}>
            ← VOLTAR
          </div>
          <h1 className="wishlist-title">FAVORITOS</h1>
          <p className="wishlist-subtitle">
            {wishItems.length === 0
              ? "Sua lista de desejos está vazia"
              : `${wishItems.length} ${wishItems.length === 1 ? "item salvo" : "itens salvos"}`}
          </p>
        </div>
      </div>

      {wishItems.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <p className="wishlist-empty-text">Explore nossa coleção e salve seus itens favoritos</p>
          <button className="btn-primary" onClick={() => setPage("home")}>
            VER COLEÇÃO
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishItems.map((product) => (
            <div key={product.id} className="wish-item">
              {/* Image */}
              <div
                className="wish-item-img"
                onClick={() => setPage("product", product)}
              >
                {product.img && !imgErrors[product.id] ? (
                  <img
                    src={product.img}
                    alt={product.name}
                    loading="lazy"
                    onError={() => setImgErrors(e => ({ ...e, [product.id]: true }))}
                  />
                ) : (
                  <div className="wish-item-fallback" style={{ background: product.gradient }}>
                    <span style={{ fontSize: 48, opacity: 0.8, color: product.accent }}>
                      {product.emoji}
                    </span>
                  </div>
                )}
                {product.tag && <span className="wish-item-tag">{product.tag}</span>}
              </div>

              {/* Info */}
              <div className="wish-item-info">
                <div className="wish-item-cat">{product.category}</div>
                <div
                  className="wish-item-name"
                  onClick={() => setPage("product", product)}
                >
                  {product.name}
                </div>
                <div className="wish-item-price">
                  R$ {product.price.toLocaleString("pt-BR")}
                </div>
                <div className="wish-item-actions">
                  <button
                    className="wish-add-btn"
                    onClick={() => add(product, product.sizes[0])}
                  >
                    + ADICIONAR AO CARRINHO
                  </button>
                  <button
                    className="wish-remove-btn"
                    onClick={() => toggle(product.id)}
                    title="Remover dos favoritos"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
