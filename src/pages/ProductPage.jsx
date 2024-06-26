import axios from "axios";
import React, { useEffect, useState } from "react";
import { PRODUCT_BASE_URL } from "../../constants/url.constant";
import { ProductList } from "../components/ProductList";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../constants/data.constants";
import ProductFilter from "../components/ProductFilter";
import Pagination from "../components/Pagination";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterValues, setFilterValues] = useState({
    name: searchParams.get("name") || "",
    inStock: searchParams.get("inStock") === "true",
    onSale: searchParams.get("onSale") === "true",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    categories: searchParams.getAll("categories").length
      ? searchParams.getAll("categories")
      : CATEGORIES,
  });

  const page =
    parseInt(searchParams.get("page")) < 1
      ? 1
      : parseInt(searchParams.get("page"));

  useEffect(() => {
    // Set initial search params if categories are not already set
    if (!searchParams.getAll("categories").length) {
      CATEGORIES.forEach((category) =>
        searchParams.append("categories", category),
      );
      setSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const params = {};
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
      params.page = page;

      params.categories = searchParams.getAll("categories");

      const options = { params };

      console.log("options", options);

      // Fetch the products
      const response = await axios.get(PRODUCT_BASE_URL, options);
      const data = response.data;
      setProducts(data);

      // Fetch the product count
      const countResponse = await axios.get(
        `${PRODUCT_BASE_URL}/count`,
        options,
      );
      const { count } = countResponse.data;
      setProductCount(count);
    }
    fetchData();
  }, [searchParams, page]);

  async function handleDeleteProduct(productId) {
    await axios.delete(`${PRODUCT_BASE_URL}/${productId}`);
    const newProducts = products.filter((product) => product._id !== productId);
    setProducts(newProducts);
  }

  async function handleCreateProduct(ev) {
    ev.preventDefault();
    const form = ev.target;
    const name = form.name.value;
    const price = form.price.value;
    const response = await axios.post(PRODUCT_BASE_URL, {
      name,
      price,
    });
    const newProduct = response.data;
    setProducts([...products, newProduct]);
  }

  function handleFilterChange(ev) {
    const { name, value, type, checked } = ev.target;

    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleCategoryChange(ev) {
    const { checked, id } = ev.target;
    setFilterValues((prevValues) => {
      const newCategories = checked
        ? [...prevValues.categories, id]
        : prevValues.categories.filter((category) => category !== id);
      return { ...prevValues, categories: newCategories };
    });
  }

  function handlePageChange(newPage) {
    console.log("newPage", newPage);
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  function applyFilters() {
    const { name, inStock, onSale, minPrice, maxPrice, categories } =
      filterValues;
    if (name) searchParams.set("name", name);
    else searchParams.delete("name");

    if (inStock) searchParams.set("inStock", "true");
    else searchParams.delete("inStock");

    if (onSale) searchParams.set("onSale", "true");
    else searchParams.delete("onSale");

    if (minPrice) searchParams.set("minPrice", minPrice);
    else searchParams.delete("minPrice");

    if (maxPrice) searchParams.set("maxPrice", maxPrice);
    else searchParams.delete("maxPrice");

    searchParams.delete("categories");
    categories.forEach((category) =>
      searchParams.append("categories", category),
    );

    // Reset to page 1 when filters change
    searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <main className="mx-4 mt-4 space-y-4">
      <div>
        <h1 className="text-center text-3xl">ProductPage</h1>
      </div>

      <ProductFilter
        filterValues={filterValues}
        handleFilterChange={handleFilterChange}
        handleCategoryChange={handleCategoryChange}
        applyFilters={applyFilters}
      />

      <Pagination
        page={page}
        productCount={productCount}
        handlePageChange={handlePageChange}
      />

      {/* <AddProductForm onSubmit={handleCreateProduct} /> */}

      <ProductList products={products} onDeleteProduct={handleDeleteProduct} />
    </main>
  );
}

export default ProductPage;
