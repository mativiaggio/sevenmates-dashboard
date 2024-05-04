import AsideNav from "@/components/AsideNav/AsideNav";
import { useSession, signIn, signOut } from "next-auth/react";
import UserCard from "../User/UserCard";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <div className={"bg-black w-screen h-screen flex items-center"}>
          <div className="text-center w-full">
            <button
              onClick={() => signIn("google")}
              className="bg-white p-2 px-4 rounded-lg"
            >
              Login With Google
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <div className="bg-gray-100 min-h-screen flex">
        <AsideNav />
        <div className="mt-5 ml-5">{children}</div>
      </div> */}
      <div className="bg-gray-100 min-h-screen flex">
        <AsideNav className="general-navbar" />
        <div className="general-content m-5">
          <UserCard />
          {children}
        </div>
      </div>
    </>
  );
}
