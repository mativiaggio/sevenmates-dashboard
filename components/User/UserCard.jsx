import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

function UserCard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  async function logout() {
    await router.push("/");
    await signOut();
  }

  function truncateName(name) {
    return name.length > 8 ? name.substring(0, 8) + "..." : name;
  }

  return (
    <>
      <div
        className={`bg-transparent hover:bg-transparent text-black dark:text-white text-xl flex p-0 ${
          window.innerWidth <= 767 ? "font-normal" : "font-semibold"
        }`}
      >
        {truncateName(session?.user?.name)}
      </div>
    </>
  );
}

export default UserCard;
