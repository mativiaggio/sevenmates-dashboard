import SpinnerBar from "@/components/Spinners/SpinnerBar";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ProductForm({
  _id,
  name: existingName,
  category: existingCategory,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  featured: existingFeatured,
  properties: existingProperties,
}) {
  const [name, setName] = useState(existingName || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [featured, setFeatured] = useState(existingFeatured || false);

  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCatecories] = useState([]);

  const [properties, setProperties] = useState(existingProperties || []);

  const router = useRouter();

  const data = {
    name,
    category,
    description,
    price,
    images,
    featured,
    slug: name.toLowerCase().replace(/\s/g, "-"),
    properties: properties.map((p) => ({
      name: p.name,
      values: p.values.split(","),
    })),
  };

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCatecories(result.data);
    });
  }, []);

  async function saveProduct(e) {
    e.preventDefault();

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(e) {
    const files = e.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);

      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);

      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
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
    <>
      <form className="main-form" onSubmit={saveProduct}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
              <div className="sm:col-span-4">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium leading-6 "
                >
                  Nombre
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black">
                    <Input
                      type="text"
                      name="product-name"
                      id="product-name"
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                      placeholder="Mate imperial premium"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="category-parent"
                  className="block text-sm font-medium leading-6 "
                >
                  Categoría
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black">
                  <Select
                    name="category-parent"
                    id="category-parent"
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 cls
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorías Disponibles</SelectLabel>
                        <SelectItem value="0" className="cursor-pointer">
                          Sin categoría
                        </SelectItem>
                        {categories.length > 0 &&
                          categories.map((category) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={category._id}
                              value={category._id}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 "
                >
                  Descripción
                </label>
                <div className="mt-2">
                  <Textarea
                    id="product-description"
                    name="product-description"
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Agrega una descripción del producto que ayude al cliente a
                  elegirlo.
                </p>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="product-price"
                  className="block text-sm font-medium leading-6 "
                >
                  Precio
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-offset ring-gray-300 focus-within:ring-2 focus-within:ring-offset focus-within:ring-black  overflow-hidden bg-white">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      $
                    </span>
                    <Input
                      type="number"
                      name="product-price"
                      id="product-price"
                      autoComplete="product-price"
                      value={price}
                      onChange={(ev) => setPrice(ev.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="50000"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
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
                          Ingresas el nombre y sus valores, nota que la
                          separación de los valores debe ser una coma y no debe
                          tener espacios.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={featured}
                      onCheckedChange={(checked) => setFeatured(checked)}
                    />
                    <Label htmlFor="terms">
                      Este es un producto seleccionado
                    </Label>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 "
                >
                  Fotos
                </label>
                <div className="flex flex-wrap">
                  <div className="sm:col-span-3 flex">
                    <ReactSortable
                      className="flex flex-wrap cursor-pointer"
                      list={images}
                      setList={updateImagesOrder}
                    >
                      {!!images?.length &&
                        images.map((link) => (
                          <div
                            className="image-container rounded-lg mr-4 mb-4"
                            key={link}
                          >
                            {/* eslint-disable-next-line  @next/next/no-img-element */}
                            <img src={link} alt="Product Image" />
                          </div>
                        ))}
                    </ReactSortable>
                  </div>
                  {isUploading && (
                    <div className="sm:col-span-3 flex">
                      <div className="add-image flex justify-center rounded-lg border border-gray-900/25 px-6 py-10 items-center mr-4">
                        <SpinnerBar />
                      </div>
                    </div>
                  )}
                  <div className="sm:col-span-3 flex mb-4">
                    <div className="add-image flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>

                        <div className="mt-4 flex text-sm leading-6 text-gray-600 flex-col">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 hover:text-black px-1"
                          >
                            <span className="underline">Subí el fotón</span>
                            <input
                              onChange={uploadImages}
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1 text-xs">
                            Podes agarrar y arrastrar (en teoría)
                          </p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href={"/products"}
            type="button"
            className="text-sm font-semibold leading-6 "
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default ProductForm;
