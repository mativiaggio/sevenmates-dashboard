import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import SideNavar from "../SideNavbar/SideNavbar";
import Header from "@/components/Header/Header";
import HeaderMobile from "@/components/Header/HeaderMobile";
import MarginWidthWrapper from "@/components/Layout/MarginWidthWrapper";
import PageWrapper from "@/components/Layout/PageWrapper";

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
    <html lang="en">
      <body className={`bg-white`}>
        <div className="flex">
          <SideNavar />
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
