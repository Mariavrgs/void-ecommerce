import "../styles/cart.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import ProductVisual from "./ProductVisual";

function CartItemImg({ item }) {
  const [err, setErr] = useState(false);
  if (item.img && !err) {
    return (
      <div className="cart-item-img">
        <img src={item.img} alt={item.name} onError={() => setErr(true)} />
      </div>
    );
  }
  return (
    <div className="cart-item-img cart-item-img-fallback">
      <ProductVisual product={item} size="sm" />
    </div>
  );
}

export default function Cart({ onClose, onCheckout }) {
  const { items, remove, updateQty, total } = useCart();

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-sidebar">

        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">CARRINHO</div>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <div className="cart-empty-text">Carrinho vazio</div>
              <p className="cart-empty-sub">Adicione produtos para continuar</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="cart-item">
                <CartItemImg item={item} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-size">Tam: {item.size}</div>
                  <div className="cart-item-bottom">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-item-price">R$ {(item.price * item.qty).toLocaleString("pt-BR")}</span>
                    <button className="cart-item-remove" onClick={() => remove(item.key)} title="Remover">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal"><span>Subtotal</span><span>R$ {total.toLocaleString("pt-BR")}</span></div>
            <div className="cart-subtotal free-ship"><span>Frete</span><span>Grátis ✓</span></div>
            <div className="cart-total"><span>Total</span><span>R$ {total.toLocaleString("pt-BR")}</span></div>
            <button className="btn-checkout" onClick={onCheckout}>
              FINALIZAR COMPRA →
            </button>
            <button className="cart-continue" onClick={onClose}>
              ← continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
