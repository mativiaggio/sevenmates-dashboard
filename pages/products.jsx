import Layout from "@/components/Layout/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

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
import Spinner from "@/components/Spinners/Spinner";

function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <div>
        <Link
          className="bg-black text-white rounded-full p-2 flex w-fit"
          href={"/products/new"}
        >
          <Plus />
          <p className="pl-1">Agregar producto</p>
        </Link>

        <Table className="basic mt-2 rounded-md overflow-hidden border-2 border-black border-collapse">
          <TableCaption>Estos son tus productos</TableCaption>
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="text-white">Nombre</TableHead>
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
              products.map((product) => (
                <TableRow id={product._id} key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="float-right flex justify-between w-full">
                    <Link
                      className="btn-default"
                      href={"/products/edit/" + product._id}
                    >
                      <Button className="btn-default flex items-center justify-around mr-4 hover:bg-black bg-gray-600">
                        <Pencil />
                        Editar
                      </Button>
                    </Link>
                    <Link
                      className="btn-red"
                      href={"/products/delete/" + product._id}
                    >
                      <Button className="btn-red flex items-center justify-around hover:bg-red-500 bg-red-400 text-white">
                        <Trash2 />
                        Eliminar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}

export default Products;
