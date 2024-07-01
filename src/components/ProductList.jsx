import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export function ProductList({ products, onDeleteProduct }) {
  const { loggedInUser } = useUserContext();

  function handleDeleteProduct(ev, productId) {
    ev.preventDefault(); // Prevent navigation
    ev.stopPropagation(); // Stop event from bubbling up
    onDeleteProduct(productId); // Call the delete function
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        return (
          <Link
            to={`${product._id}`}
            key={product._id}
            className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <img
              className="h-48 w-full object-cover object-center"
              src="https://dummyimage.com/720x400"
              alt={product.name}
            />
            <div className="px-4 pb-6 pt-2">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-xs">{product.quantity} items left</p>
              </div>
              <ul className="flex gap-2">
                {product.categories.map((category) => (
                  <li
                    className="rounded-full bg-sky-800 px-2 py-1 text-xs uppercase text-white"
                    key={category}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <p className="font-bold text-gray-700">${product.price}</p>
              </div>
              {loggedInUser && product.user === loggedInUser._id && (
                <button onClick={(ev) => handleDeleteProduct(ev, product._id)}>
                  Delete
                </button>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
