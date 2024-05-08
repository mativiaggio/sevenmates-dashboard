import Layout from "@/components/Layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import { Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Categories({ swal }) {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name, parentCategory };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }

    setName("");
    setParentCategory("");
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Estas a punto de eliminar una categoría.",
        text: "Esta acción es completamente irreversible, estas comepltamente seguro/a de querer eliminar esta categoría?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  return (
    <Layout>
      <div className="sm:mr-5 sm:w-1/2">
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
                      <Input
                        type="text"
                        name="category-name"
                        id="category-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    {/* <select
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
                    </select> */}

                    <Select
                      value={parentCategory}
                      onChange={(e) => setParentCategory(e.target.value)}
                      className="cursor-pointer"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categorías Disponibles</SelectLabel>
                          <SelectItem value="0" className="cursor-pointer">
                            Categoría Padre
                          </SelectItem>
                          {categories.length > 0 &&
                            categories.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                                className="cursor-pointer"
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
      </div>
      <Table className="basic mt-2 rounded-md overflow-hidden border-2 border-black border-collapse">
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="text-white">Categorías</TableHead>
            <TableHead className="text-white">Categoría padre</TableHead>
            <TableHead className="text-white text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 &&
            categories.map((category) => (
              <TableRow id={category._id} key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category?.parent?.name}</TableCell>
                <TableCell className="float-right flex">
                  <Button
                    onClick={() => editCategory(category)}
                    className="btn-default flex items-center justify-around mr-4 hover:bg-black bg-gray-600"
                    href={"/products/edit/" + category._id}
                  >
                    <Pencil />
                    Editar
                  </Button>
                  <Button
                    onClick={() => deleteCategory(category)}
                    className="btn-red flex items-center justify-around hover:bg-red-500 bg-red-400 text-white"
                    href={"/products/delete/" + category._id}
                  >
                    <Trash2 />
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
