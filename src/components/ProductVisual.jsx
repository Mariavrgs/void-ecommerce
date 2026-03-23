export default function ProductVisual({ product, size = "full" }) {
  const h = size === "full" ? 320 : 200;

  return (
    <div
      style={{
        width: "100%",
        height: h,
        background: product.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Geometric decorations */}
      <div
        style={{
          position: "absolute", top: "15%", left: "15%",
          width: 80, height: 80,
          border: `1px solid ${product.accent}22`,
          transform: "rotate(45deg)",
          transition: "transform 0.6s ease",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "20%", right: "15%",
          width: 50, height: 50,
          border: `1px solid ${product.accent}33`,
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute", top: "40%", right: "25%",
          width: 3, height: 60,
          background: `${product.accent}22`,
        }}
      />

      {/* Main product symbol */}
      <div
        style={{
          fontSize: size === "full" ? 80 : 50,
          color: product.accent,
          opacity: 0.85,
          fontFamily: "serif",
          lineHeight: 1,
          zIndex: 1,
          filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
          letterSpacing: "-0.05em",
        }}
      >
        {product.emoji}
      </div>

      {/* Bottom watermark */}
      <div
        style={{
          position: "absolute", bottom: 16, left: 16,
          fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
          fontSize: 10, letterSpacing: "0.3em",
          color: `${product.accent}66`,
          textTransform: "uppercase",
        }}
      >
        VOID — {new Date().getFullYear()}
      </div>
    </div>
  );
}
