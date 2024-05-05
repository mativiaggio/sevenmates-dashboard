import Layout from "@/components/Layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/products?id=${id}`).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct() {
    await axios.delete(`/api/products?id=${id}`);
    goBack();
  }
  return (
    <Layout>
      <div className="w-fit">
        <h1 className="font-bold">OJO!</h1>
        <p>
          Estas a punto de eliminar el porducto <i>{productInfo?.name}</i>. Esta
          accion es irreversible.
        </p>
        <div className="w-full flex justify-between">
          <div></div>
          <div>
            <button onClick={goBack} className="cancel-delete-button mr-4">
              Cancelar
            </button>
            <button onClick={deleteProduct} className="delete-button">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
