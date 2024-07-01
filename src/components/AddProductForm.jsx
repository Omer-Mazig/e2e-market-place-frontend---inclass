import React from "react";
import { Button } from "./ui/Button";

export function AddProductForm({ onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto grid max-w-72 space-y-4 rounded-md bg-gray-300 p-4 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name:</label>
        <input
          className="rounded-sm px-4 py-1 outline outline-1 outline-sky-700"
          type="text"
          id="name"
          name="name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="price">Price:</label>
        <input
          className="rounded-sm p-2 outline outline-1 outline-sky-700"
          type="number"
          id="price"
          name="price"
        />
      </div>

      <Button>Create</Button>
    </form>
  );
}
