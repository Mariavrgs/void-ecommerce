import { useState } from "react";
import "../styles/productCard.css";
import { useWishlist } from "../context/WishlistContext";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product, onView, onAdd }) {
  const { toggle, has } = useWishlist();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isWished = has(product.id);

  return (
    <div
      className="product-card"
      onClick={() => onView(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.tag && <span className="card-tag">{product.tag}</span>}

      {/* Wishlist heart */}
      <button
        className={`card-wish-btn ${isWished ? "wished" : ""}`}
        onClick={(e) => { e.stopPropagation(); toggle(product.id); }}
        title={isWished ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-label="Favoritar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24"
          fill={isWished ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      {/* Image area */}
      <div className="card-img-wrapper">
        {/* Skeleton */}
        {!imgLoaded && !imgError && (
          <div className="card-skeleton" />
        )}

        {/* Real image */}
        {!imgError ? (
          <>
            <img
              src={product.img}
              alt={product.name}
              className={`card-img card-img--main ${imgLoaded ? "card-img--loaded" : ""}`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
            {product.imgHover && (
              <img
                src={product.imgHover}
                alt=""
                aria-hidden
                className={`card-img card-img--hover ${hovered ? "card-img--hover-active" : ""}`}
                loading="lazy"
              />
            )}
          </>
        ) : (
          <ProductVisual product={product} />
        )}
      </div>

      <div className="card-info">
        <div className="card-cat">{product.category}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-price">R$ {product.price.toLocaleString("pt-BR")}</div>
      </div>

      <div className="card-hover-actions" onClick={(e) => e.stopPropagation()}>
        <button className="btn-add" onClick={() => onAdd(product, product.sizes[0])}>
          + CARRINHO
        </button>
        <button className="btn-view" onClick={() => onView(product)}>
          VER
        </button>
      </div>
    </div>
  );
}
