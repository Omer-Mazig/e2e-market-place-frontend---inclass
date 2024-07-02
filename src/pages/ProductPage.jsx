import React, { useEffect, useState } from "react";
import { ProductList } from "../components/ProductList";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../constants/data.constants";
import ProductFilter from "../components/ProductFilter";
import Pagination from "../components/Pagination";
import { AddProductForm } from "../components/AddProductForm";
import { useUserContext } from "../contexts/UserContext";
import api from "../services/api.service";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const { loggedInUser } = useUserContext();

  const page =
    isNaN(parseInt(searchParams.get("page"))) ||
    parseInt(searchParams.get("page")) < 1
      ? 1
      : parseInt(searchParams.get("page"));

  useEffect(() => {
    // Set initial search params if categories are not already set (so we can see it in the URL)
    if (!searchParams.getAll("categories").length) {
      CATEGORIES.forEach((category) =>
        searchParams.append("categories", category),
      );
      setSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchParams, page]);

  async function fetchData() {
    const params = {};
    // Convert URLSearchParams to object
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    params.page = page;

    params.categories = searchParams.getAll("categories");

    const options = { params };

    // Fetch the products
    const response = await api.get("/product", options);
    const data = response.data;
    setProducts(data);

    // Fetch the product count
    const countResponse = await api.get(`/product/count`, options);
    const { count } = countResponse.data;
    setProductCount(count);
  }

  async function handleDeleteProduct(productId) {
    await api.delete(`/product/${productId}`);

    // const newProducts = products.filter((product) => product._id !== productId);
    // setProducts(newProducts);
    await fetchData();
  }

  async function handleCreateProduct(ev) {
    ev.preventDefault();
    const form = ev.target;
    const name = form.name.value;
    const price = form.price.value;

    const response = await api.post("/product", {
      name,
      price,
    });

    const newProduct = response.data;
    // setProducts([...products, newProduct]);
    await fetchData();
  }

  return (
    <main className="mx-4 mt-4 space-y-4">
      <div>
        <h1 className="text-center text-3xl">ProductPage</h1>
      </div>

      <div className="mx-auto max-w-3xl rounded-md bg-gray-300 p-4 shadow-sm">
        <h2>Filter</h2>
        <ProductFilter />
      </div>
      {loggedInUser && <AddProductForm onSubmit={handleCreateProduct} />}

      <ProductList products={products} onDeleteProduct={handleDeleteProduct} />

      <Pagination
        page={page}
        productCount={productCount}
        handlePageChange={(newPage) => {
          searchParams.set("page", newPage);
          setSearchParams(searchParams);
        }}
      />
    </main>
  );
}

export default ProductPage;
