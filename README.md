# VOID — Streetwear E-commerce

Mini e-commerce completo para a marca **VOID**, construído com React + CSS puro.

---

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:5173
```

### Build para produção

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura do projeto

```
void-ecommerce/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Roteamento e providers
    │
    ├── components/           # Componentes reutilizáveis
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductVisual.jsx
    │   ├── Filters.jsx
    │   ├── Cart.jsx
    │   └── Footer.jsx
    │
    ├── context/              # Estado global
    │   └── CartContext.jsx
    │
    ├── data/                 # Dados dos produtos
    │   └── products.js
    │
    ├── pages/                # Páginas completas
    │   ├── HomePage.jsx
    │   ├── ProductPage.jsx
    │   └── CheckoutPage.jsx
    │
    └── styles/               # CSS por contexto
        ├── global.css
        ├── navbar.css
        ├── productCard.css
        ├── cart.css
        ├── home.css
        ├── productPage.css
        └── checkout.css
```

---

## ✅ Funcionalidades

- **Home** com hero, grid de produtos, filtros por categoria/preço e ordenação
- **Página de produto** com galeria, seleção de tamanho e feedback visual
- **Carrinho lateral** animado com atualização em tempo real
- **Persistência** do carrinho via `localStorage`
- **Checkout simulado** com resumo do pedido e tela de sucesso
- **Design responsivo** para mobile, tablet e desktop

## 🎨 Stack

| Tecnologia | Uso |
|---|---|
| React 18 | UI e componentes |
| Context API | Estado global do carrinho |
| CSS puro | Estilização modular |
| Vite | Build tool |
| localStorage | Persistência do carrinho |
