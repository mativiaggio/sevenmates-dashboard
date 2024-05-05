import Layout from "@/components/Layout/Layout";
import ProductForm from "@/components/Products/Form/ProductForm";
import UserCard from "@/components/User/UserCard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { useState } from "react";

function New() {
  return (
    <>
      <Layout>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Datos de producto
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Llena los datos para poder agregar un producto nuevo a la base de
          datos.
        </p>
        <ProductForm />
      </Layout>
    </>
  );
}

export default New;
