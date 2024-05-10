import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

function UserCard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        className="rounded-full"
        src={session?.user?.image}
        width={25}
        height={25}
        alt="Logo"
      />
    </>
  );
}

export default UserCard;
