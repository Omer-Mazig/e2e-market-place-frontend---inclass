import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PRODUCT_BASE_URL } from "../../constants/url.constant";

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${PRODUCT_BASE_URL}/${productId}`);
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
