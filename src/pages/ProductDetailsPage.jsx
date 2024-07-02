import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.service";

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/product/${productId}`);
      const data = response.data;
      setProduct(data);
    }
    fetchData();
  }, [productId]);

  return (
    <main>
      <div>
        <h1>ProductDetailsPage</h1>
      </div>
      {product && (
        <div>
          <h2>Name: {product.name}</h2>
          <p>Price: ${product.price}</p>
        </div>
      )}
    </main>
  );
}

export default ProductDetailsPage;
