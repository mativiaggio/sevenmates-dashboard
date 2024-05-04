import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

function UserCard() {
  const { data: session } = useSession();

  if (!session) return;
  return (
    <>
      <div className="bg-white p-4 mb-4 rounded-2xl w-fit">
        <div className="flex">
          <Image
            className="rounded-full"
            src={session?.user?.image}
            width={25}
            height={25}
            alt="Logo"
          />
          <div className="ml-2">{session?.user?.name}</div>
        </div>
        <p className="text-gray-600">{session?.user?.email}</p>
      </div>
    </>
  );
}

export default UserCard;
