import { useState } from "react";
import "../styles/checkout.css";
import { useCart } from "../context/CartContext";
import ProductVisual from "../components/ProductVisual";

export default function CheckoutPage({ setPage }) {
  const { items, total, clear } = useCart();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    nome: "", email: "", cep: "", endereco: "", cidade: "",
    cartao: "", validade: "", cvv: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setDone(true);
    clear();
  };

  /* ── Success screen ── */
  if (done) return (
    <div className="success-page page-enter">
      <div className="success-icon">✓</div>
      <h1 className="success-title">PEDIDO<br />CONFIRMADO</h1>
      <p className="success-subtitle">
        Seu pedido foi recebido e está sendo preparado com cuidado.
        Você receberá um e-mail de confirmação em breve.
      </p>
      <div className="success-order">
        PEDIDO #VOID-{Math.floor(Math.random() * 90000 + 10000)}
      </div>
      <button className="btn-primary" onClick={() => setPage("home")}>
        CONTINUAR COMPRANDO
      </button>
    </div>
  );

  /* ── Empty cart guard ── */
  if (items.length === 0) return (
    <div className="success-page page-enter">
      <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.2 }}>◻</div>
      <h2 className="success-title" style={{ fontSize: 48 }}>CARRINHO VAZIO</h2>
      <button className="btn-primary" style={{ marginTop: 32 }} onClick={() => setPage("home")}>
        VER PRODUTOS
      </button>
    </div>
  );

  return (
    <div className="checkout-page page-enter">
      <h1 className="checkout-title">CHECKOUT</h1>

      <div className="checkout-grid">
        {/* ── Form ── */}
        <div>
          <div className="form-section">
            <div className="form-section-title">Informações pessoais</div>
            <div className="form-row">
              <div className="form-group">
                <label>Nome completo</label>
                <input name="nome" value={form.nome} onChange={handleChange} className="form-input" placeholder="Seu nome" />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="seu@email.com" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Endereço de entrega</div>
            <div className="form-row">
              <div className="form-group">
                <label>CEP</label>
                <input name="cep" value={form.cep} onChange={handleChange} className="form-input" placeholder="00000-000" />
              </div>
              <div className="form-group">
                <label>Cidade</label>
                <input name="cidade" value={form.cidade} onChange={handleChange} className="form-input" placeholder="Sua cidade" />
              </div>
            </div>
            <div className="form-group">
              <label>Endereço completo</label>
              <input name="endereco" value={form.endereco} onChange={handleChange} className="form-input" placeholder="Rua, número, complemento" />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Pagamento</div>
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
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div>
          <div className="order-summary">
            <div className="order-summary-title">RESUMO DO PEDIDO</div>

            {items.map((item) => (
              <div key={item.key} className="order-item">
                <div className="order-item-img">
                  <ProductVisual product={item} size="sm" />
                </div>
                <div>
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-size">TAM {item.size} × {item.qty}</div>
                </div>
                <span className="order-item-price">R$ {item.price * item.qty}</span>
              </div>
            ))}

            <hr className="order-divider" />
            <div className="order-line"><span>Subtotal</span><span>R$ {total}</span></div>
            <div className="order-line"><span>Frete</span><span>Grátis</span></div>
            <div className="order-total"><span>Total</span><span>R$ {total}</span></div>

            <button className="btn-finalize" onClick={handleSubmit}>
              FINALIZAR COMPRA ✓
            </button>

            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)",
              textAlign: "center", marginTop: 16, letterSpacing: "0.15em",
            }}>
              PAGAMENTO 100% SEGURO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
