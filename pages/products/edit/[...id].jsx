import Layout from "@/components/Layout/Layout";
import ProductForm from "@/components/Products/Form/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
        Editar el producto
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
        Llena los datos para poder editar el producto y subirlo a la base de
        datos.
      </p>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
