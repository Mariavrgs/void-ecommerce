import "../styles/productCard.css";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product, onView, onAdd }) {
  return (
    <div className="product-card" onClick={() => onView(product)}>
      {product.tag && <span className="card-tag">{product.tag}</span>}

      <div className="card-img-wrapper">
        <ProductVisual product={product} />
      </div>

      <div className="card-info">
        <div className="card-cat">{product.category}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-price">R$ {product.price}</div>
      </div>

      <div
        className="card-hover-actions"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="btn-add" onClick={() => onAdd(product, "M")}>
          + CARRINHO
        </button>
        <button className="btn-view" onClick={() => onView(product)}>
          VER
        </button>
      </div>
    </div>
  );
}
