export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div>
          <div className="footer-brand">VOID<span>.</span></div>
          <p className="footer-tagline">
            Streetwear para quem vive fora do convencional. Qualidade premium, estética única.
          </p>
        </div>

        <div className="footer-col">
          <h4>Loja</h4>
          <ul>
            {["Camisetas", "Hoodies", "Calças", "Acessórios", "Lançamentos"].map((i) => (
              <li key={i}><a>{i}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Suporte</h4>
          <ul>
            {["Trocas", "Envios", "FAQ", "Contato", "Tamanhos"].map((i) => (
              <li key={i}><a>{i}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Redes</h4>
          <ul>
            {["Instagram", "TikTok", "Pinterest", "Twitter"].map((i) => (
              <li key={i}><a>{i}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 VOID. Todos os direitos reservados.</p>
        <p>DESIGN BY VOID STUDIO</p>
      </div>
    </footer>
  );
}
