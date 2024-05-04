import Layout from "@/components/Layout/Layout";
import UserCard from "@/components/User/UserCard";
import Link from "next/link";
import React from "react";

function Products() {
  return (
    <Layout>
      <div>
        <Link
          className="bg-black text-white rounded-full p-2 flex w-fit"
          href={"/products/new"}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          {/* Agregar un producto */}
        </Link>
      </div>
    </Layout>
  );
}

export default Products;
