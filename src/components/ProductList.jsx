import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

export default function ProductList({ onSelect }) {
    const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 800); // intentional delay for skeleton visibility

  return () => clearTimeout(timer);
}, []);

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category === "All" ? true : p.category === category
    )
    .filter((p) =>
      status === "All" ? true : p.status === status
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  return (
    <section style={{ marginTop: "32px" }}>
      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All categories</option>
          <option value="Textiles">Textiles</option>
          <option value="Metals">Metals</option>
          <option value="Chemicals">Chemicals</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All statuses</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Published">Published</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by last updated</option>
          <option value="name">Sort by name</option>
        </select>
      </div>

      {/* Product list */}
      {/* <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
        {filteredProducts.length === 0 ? (
          <p style={{ padding: "24px", color: "#667085" }}>
            No products match the selected criteria.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div> */}
      <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
    {loading ? (
    <>
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
    </>
  ) : filteredProducts.length === 0 ? (
    <p style={{ padding: "24px", color: "#667085" }}>
      No products match the selected criteria.
    </p>
  ) : (
    filteredProducts.map((product) => (
      <ProductCard key={product.id}
      product={product}
      onClick={() => onSelect(product)}
/>
    ))
  )}
 </div>

    </section>
  );
}
