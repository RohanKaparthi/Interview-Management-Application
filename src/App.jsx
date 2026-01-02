import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main style={{ padding: "32px" }}>
      <h1>Product Disclosures</h1>
      <p style={{ marginTop: "8px" }}>
        Producer-declared product information
      </p>

      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <ProductList onSelect={setSelectedProduct} />
      )}
    </main>
  );
}
