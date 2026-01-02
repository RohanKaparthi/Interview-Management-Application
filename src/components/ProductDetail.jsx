export default function ProductDetail({ product, onBack }) {
  if (!product) return null;

  return (
    <section className="detail-panel">
      <button className="back-button" onClick={onBack}>
        ← Back to product list
      </button>

      <h2 style={{ fontSize: "24px" }}>{product.name}</h2>
      <p style={{ marginTop: "4px" }}>
        {product.category} · Produced by {product.producer}
      </p>

      <div className="detail-section">
 <h3 style={{ fontSize: "16px" }}>Disclosure summary</h3>
  <p>
    <strong>Declared by:</strong> {product.producer}
  </p>
  <p>
    <strong>Date of declaration:</strong> {product.updatedAt}
  </p>
  <p>
    <strong>Evidence attached:</strong> Producer-reported (2 files)
  </p>
</div>


      <div className="detail-section">
        <h3>Version history</h3>
        <ul className="version-list">
  <li>
    <strong>Version 1</strong> — Disclosure saved as draft · 2024-10-10
  </li>
  <li>
    <strong>Version 2</strong> — Disclosure made publicly available · 2024-11-12
  </li>
</ul>
      </div>

      <div className="disclaimer">
  This page presents producer-declared information. It does not
  constitute certification, verification, or endorsement by the
  platform. Evidence, if any, is attached by the producer.
    </div>
    </section>
  );
}
