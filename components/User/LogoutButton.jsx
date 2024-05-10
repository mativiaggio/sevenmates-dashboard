import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

function LogoutButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <>
      <Button
        onClick={logout}
        className="bg-transparent hover:bg-transparent text-black dark:text-white p-0"
      >
        <span className="text-base font-normal">Cerrar sesión</span>
      </Button>
    </>
  );
}

export default LogoutButton;
