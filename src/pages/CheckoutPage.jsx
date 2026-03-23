import { useState } from "react";
import "../styles/checkout.css";
import { useCart } from "../context/CartContext";
import ProductVisual from "../components/ProductVisual";

function OrderItemImg({ item }) {
  const [err, setErr] = useState(false);
  if (item.img && !err) {
    return (
      <img
        src={item.img} alt={item.name} className="order-item-img"
        style={{ width: 56, height: 70, objectFit: "cover", flexShrink: 0 }}
        onError={() => setErr(true)}
      />
    );
  }
  return <div className="order-item-img"><ProductVisual product={item} size="sm" /></div>;
}

export default function CheckoutPage({ setPage }) {
  const { items, total, clear } = useCart();
  const [done, setDone] = useState(false);
  const [orderNum] = useState(() => Math.floor(Math.random() * 90000 + 10000));
  const [form, setForm] = useState({
    nome: "", email: "", cep: "", endereco: "", cidade: "", estado: "",
    cartao: "", validade: "", cvv: "", titular: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setDone(true);
    clear();
  };

  if (done) return (
    <div className="success-page page-enter">
      <div className="success-icon">✓</div>
      <h1 className="success-title">PEDIDO<br />CONFIRMADO</h1>
      <p className="success-subtitle">
        Seu pedido foi recebido e está sendo preparado com cuidado.
        Você receberá um e-mail de confirmação em breve.
      </p>
      <div className="success-order">PEDIDO #VOID-{orderNum}</div>
      <div className="success-actions">
        <button className="btn-primary" onClick={() => setPage("home")}>
          CONTINUAR COMPRANDO
        </button>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="success-page page-enter">
      <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.15 }}>◻</div>
      <h2 className="success-title" style={{ fontSize: 48 }}>CARRINHO VAZIO</h2>
      <button className="btn-primary" style={{ marginTop: 32 }} onClick={() => setPage("home")}>
        VER PRODUTOS
      </button>
    </div>
  );

  return (
    <div className="checkout-page page-enter">
      <div className="checkout-breadcrumb" onClick={() => setPage("home")}>
        ← CONTINUAR COMPRANDO
      </div>
      <h1 className="checkout-title">CHECKOUT</h1>

      <div className="checkout-grid">
        {/* ── Form ── */}
        <div>
          <div className="form-section">
            <div className="form-section-title">
              <span className="form-step">01</span> Informações pessoais
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Nome completo</label>
                <input name="nome" value={form.nome} onChange={handleChange} className="form-input" placeholder="Seu nome completo" />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="seu@email.com" type="email" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <span className="form-step">02</span> Endereço de entrega
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>CEP</label>
                <input name="cep" value={form.cep} onChange={handleChange} className="form-input" placeholder="00000-000" />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input name="estado" value={form.estado} onChange={handleChange} className="form-input" placeholder="SP" />
              </div>
            </div>
            <div className="form-group">
              <label>Endereço completo</label>
              <input name="endereco" value={form.endereco} onChange={handleChange} className="form-input" placeholder="Rua, número, complemento" />
            </div>
            <div className="form-group">
              <label>Cidade</label>
              <input name="cidade" value={form.cidade} onChange={handleChange} className="form-input" placeholder="Sua cidade" />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <span className="form-step">03</span> Pagamento
            </div>
            <div className="form-group">
              <label>Nome no cartão</label>
              <input name="titular" value={form.titular} onChange={handleChange} className="form-input" placeholder="Como aparece no cartão" />
            </div>
            <div className="form-group">
              <label>Número do cartão</label>
              <input name="cartao" value={form.cartao} onChange={handleChange} className="form-input" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Validade</label>
                <input name="validade" value={form.validade} onChange={handleChange} className="form-input" placeholder="MM/AA" />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input name="cvv" value={form.cvv} onChange={handleChange} className="form-input" placeholder="000" />
              </div>
            </div>
            <div className="payment-badges">
              {["VISA","MC","PIX","BOLETO"].map(b => (
                <span key={b} className="payment-badge">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div>
          <div className="order-summary">
            <div className="order-summary-title">RESUMO</div>

            <div className="order-items-list">
              {items.map((item) => (
                <div key={item.key} className="order-item">
                  <OrderItemImg item={item} />
                  <div className="order-item-details">
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-size">TAM {item.size} × {item.qty}</div>
                  </div>
                  <span className="order-item-price">
                    R$ {(item.price * item.qty).toLocaleString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>

            <hr className="order-divider" />
            <div className="order-line"><span>Subtotal</span><span>R$ {total.toLocaleString("pt-BR")}</span></div>
            <div className="order-line free"><span>Frete</span><span>Grátis ✓</span></div>
            <div className="order-total"><span>Total</span><span>R$ {total.toLocaleString("pt-BR")}</span></div>

            <button className="btn-finalize" onClick={handleSubmit}>
              CONFIRMAR PEDIDO →
            </button>
            <div className="checkout-security">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              PAGAMENTO 100% SEGURO
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
