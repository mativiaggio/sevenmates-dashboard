import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

function UserCard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null; // Devuelve null si no hay sesión

  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <div className="p-4 mb-4 rounded-2xl w-fit">
      <div className="w-full">
        <div className="w-full flex justify-between">
          <div className="flex items-center">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              className="rounded-full"
              src={session?.user?.image}
              width={25}
              height={25}
              alt="Logo"
            />
            <div className="ml-2">{session?.user?.name}</div>
          </div>
          <div>
            <button onClick={() => logout()}>
              {/* Ahora la función signOut está envuelta en una función de flecha */}
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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <p>{session?.user?.email}</p>
    </div>
  );
}

export default UserCard;
