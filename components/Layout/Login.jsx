import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div className={"bg-black w-screen h-screen flex items-center"}>
      <div className="text-center w-full flex flex-col items-center justify-center">
        {/* eslint-disable @next/next/no-img-element */}

        <div className="mb-4">
          <img
            className="navbar-brand-img"
            src="/sevenmates/navbar-banner-white.png"
            width={300}
            height={82}
            alt="Logo"
          />
        </div>
        <button
          onClick={() => signIn("google")}
          className="bg-white p-2 px-4 rounded-3xl flex justify-center items-center"
        >
          <FcGoogle className="mr-2" />
          <span>Inicia sesión con Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
