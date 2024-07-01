import React, { useState } from "react";
import { CATEGORIES } from "../../constants/data.constants";
import { Checkbox } from "./ui/Checkbox";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useSearchParams } from "react-router-dom";

function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  /*  👇👇👇
   The state "filterValues" is needed because we want to keep track 
   of the input values (input, checkbox, etc) in the filter form.
  Only when the user clicks the "Apply Filters" button, we will update the URLSearchParams.

  If we want to filter on change, 
  we dont need this state and can directly update the URLSearchParams.
  */
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
      return {
        ...prevValues,
        categories: newCategories.length ? newCategories : CATEGORIES,
      };
    });
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
    <div>
      <div className="gap flex items-center gap-4">
        {CATEGORIES.map((category) => {
          const isChecked = filterValues.categories.includes(category);
          const categoryStyle = isChecked
            ? "bg-sky-800 text-white hover:bg-sky-900"
            : "bg-gray-200 hover:bg-gray-300";
          return (
            <React.Fragment key={category}>
              <Checkbox
                id={category}
                name="categories"
                checked={isChecked}
                onChange={handleCategoryChange}
                hidden
              />
              <label
                htmlFor={category}
                className={`flex cursor-pointer items-center rounded-full px-2 py-1 text-xs uppercase shadow-sm hover:shadow-md ${categoryStyle}`}
              >
                {category}
              </label>
            </React.Fragment>
          );
        })}
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block">Name:</label>
          <Input
            type="text"
            name="name"
            onChange={handleFilterChange}
            value={filterValues.name}
          />
        </div>
        <div>
          <label className="mb-1 block">In Stock:</label>
          <Checkbox
            name="inStock"
            onChange={handleFilterChange}
            checked={filterValues.inStock}
          />
        </div>
        <div>
          <label className="mb-1 block">On Sale:</label>
          <Checkbox
            name="onSale"
            onChange={handleFilterChange}
            checked={filterValues.onSale}
          />
        </div>
        <div>
          <label className="mb-1 block">Min Price:</label>
          <Input
            type="number"
            name="minPrice"
            onChange={handleFilterChange}
            value={filterValues.minPrice}
          />
        </div>
        <div>
          <label className="mb-1 block">Max Price:</label>
          <Input
            type="number"
            name="maxPrice"
            onChange={handleFilterChange}
            value={filterValues.maxPrice}
          />
        </div>
      </div>

      <Button onClick={() => applyFilters(filterValues)}>Apply Filters</Button>
    </div>
  );
}

export default ProductFilter;
