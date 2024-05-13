import Layout from "@/components/Layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SpinnerBar from "@/components/Spinners/SpinnerBar";
import Spinner from "@/components/Spinners/Spinner";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    setIsLoading(true);
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
      setIsLoading(false);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    if (category.properties) {
      setProperties(
        category.properties.map(({ name, values }) => ({
          name,
          values: values.join(","),
        }))
      );
    } else {
      setProperties([]);
    }
  }

  async function deleteCategory(category) {
    const { _id } = category;
    await axios.delete("/api/categories?_id=" + _id);
    fetchCategories();
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }
  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    const sanitizedValues = newValues.replace(/\s/g, "");
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = sanitizedValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <div className="sm:mr-5">
        <h2 className="text-base font-semibold leading-7 ">
          {editedCategory
            ? `Editando categoría ${editedCategory.name}.`
            : `Agrega una nueva categoría.`}
        </h2>
        <form className="main-form" onSubmit={saveCategory}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10">
              <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="category-name"
                    className="block text-sm font-medium leading-6 "
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
                    className="block text-sm font-medium leading-6 "
                  >
                    Categoría padre
                  </label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black">
                    <Select
                      value={parentCategory}
                      onValueChange={(value) => setParentCategory(value)}
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
          <div className="space-y-12">
            <div className="border-b border-gray-900/10">
              <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex flex-col rounded-md shadow-sm">
                      <Button type={"button"} onClick={addProperty}>
                        Agregar nuevas propiedades
                      </Button>
                      <div>
                        {properties.length > 0 &&
                          properties.map((property, index) => (
                            <div key={index} className="flex gap-1 my-2">
                              <Input
                                type="text"
                                value={property.name}
                                className="mb-0"
                                onChange={(ev) =>
                                  handlePropertyNameChange(
                                    index,
                                    property,
                                    ev.target.value
                                  )
                                }
                                placeholder="Nombre (ej: color)"
                              />
                              <Input
                                type="text"
                                className="mb-0"
                                onChange={(ev) =>
                                  handlePropertyValuesChange(
                                    index,
                                    property,
                                    ev.target.value
                                  )
                                }
                                value={property.values}
                                placeholder="Valores (ej: Negro,Marrón)"
                              />
                              <Button
                                onClick={() => removeProperty(index)}
                                type="button"
                                className="btn-red"
                              >
                                Eliminar
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                    <p className="my-3 text-sm leading-6 text-gray-600">
                      Ingresas el nombre y sus valores, nota que la separación
                      de los valores debe ser una coma y no debe tener espacios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {editedCategory && (
              <Button
                onClick={() => {
                  setEditedCategory(null);
                  setName("");
                  setParentCategory("");
                  setProperties([]);
                }}
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
      {!editedCategory && (
        <Table className="basic mt-2 rounded-md overflow-hidden border-2 border-black border-collapse">
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="text-white">Categorías</TableHead>
              <TableHead className="text-white">Categoría padre</TableHead>
              <TableHead className="text-white text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell className="w-full flex items-center justify-start">
                  <Spinner />
                  <span className="ml-2">
                    Para la emoción! Estamos cargando...
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              categories.length > 0 &&
              categories.map((category) => (
                <TableRow id={category._id} key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category?.parent?.name}</TableCell>
                  <TableCell className="float-right flex">
                    <Button
                      onClick={() => editCategory(category)}
                      className="btn-default flex items-center justify-around mr-4"
                    >
                      <Pencil />
                      Editar
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 btn-default flex items-center justify-around mr-4 hover:bg-red-400 bg-red-500">
                        Eliminar
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>PRESTA ATENCION</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción es completamente irreversible, estas
                            comepltamente seguro/a de querer eliminar esta
                            categoría?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteCategory(category)}
                            className="btn-red flex items-center justify-around hover:bg-red-500 bg-red-400 text-white"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </Layout>
  );
}
