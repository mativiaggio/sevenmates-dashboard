import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

function CategoryForm({ categories, fetchCategories, editedCategory }) {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  async function saveCategory(e) {
    e.preventDefault();
    await axios.post("/api/categories", { name, parentCategory });
    setName("");
    setParentCategory("");
    fetchCategories();
  }

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {editedCategory
          ? `Editando categoría ${editedCategory.name}.`
          : `Agrega una nueva categoría.`}
      </h2>
      <form className="main-form" onSubmit={saveCategory}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <div className="mt-5 grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-4">
              <div className="sm:col-span-4">
                <label
                  htmlFor="category-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black">
                    <input
                      type="text"
                      name="category-name"
                      id="category-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cls
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                      placeholder="Mates"
                    />
                  </div>
                  <p className="my-3 text-sm leading-6 text-gray-600">
                    Con este campo podes agregar una nueva categoría para los
                    productos. Las categorías se usaran para buscar.
                  </p>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="category-parent"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Categoría padre
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black">
                  <select
                    name="category-parent"
                    id="category-parent"
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cls
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  >
                    <option value="0">Categoría principal</option>
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Agregar
          </button>
        </div>
      </form>
    </>
  );
}

export default CategoryForm;
