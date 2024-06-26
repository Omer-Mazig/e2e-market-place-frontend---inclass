import React from "react";
import { CATEGORIES } from "../../constants/data.constants";
import { Checkbox } from "./ui/Checkbox";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

function ProductFilter({
  filterValues,
  handleFilterChange,
  handleCategoryChange,
  applyFilters,
}) {
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

      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  );
}

export default ProductFilter;
