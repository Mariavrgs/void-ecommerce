import "../styles/cart.css";
import { useCart } from "../context/CartContext";
import ProductVisual from "./ProductVisual";

export default function Cart({ onClose, onCheckout }) {
  const { items, remove, updateQty, total } = useCart();

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />

      <div className="cart-sidebar">
        <div className="cart-header">
          <div className="cart-title">CARRINHO</div>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">◻</div>
              <div className="cart-empty-text">Seu carrinho está vazio</div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="cart-item">
                <div className="cart-item-img">
                  <ProductVisual product={item} size="sm" />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-size">Tam: {item.size}</div>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-item-price">R$ {item.price * item.qty}</span>
                    <button className="cart-item-remove" onClick={() => remove(item.key)}>✕</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal"><span>Subtotal</span><span>R$ {total}</span></div>
            <div className="cart-subtotal"><span>Frete</span><span>Grátis</span></div>
            <div className="cart-total"><span>Total</span><span>R$ {total}</span></div>
            <button
              className="btn-checkout"
              onClick={() => { onClose(); onCheckout(); }}
            >
              FINALIZAR COMPRA →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
