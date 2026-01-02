export default function ProductCard({ product, onClick }) {
  return (
    <article
      className="product-card"
      tabIndex="0"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >

      <div>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
      </div>

      <div>
        <p>{product.producer}</p>
        <span className={`status ${product.status.toLowerCase()}`}>
          {product.status}
        </span>
      </div>

      <time style={{ fontSize: "14px", color: "#667085" }}>
        Updated {product.updatedAt}
      </time>
    </article>
  );
}
