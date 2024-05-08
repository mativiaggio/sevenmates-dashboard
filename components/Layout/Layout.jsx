import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import SideNavar from "../SideNavbar/SideNavbar";
import Header from "@/components/Header/Header";
import HeaderMobile from "@/components/Header/HeaderMobile";
import MarginWidthWrapper from "@/components/Layout/MarginWidthWrapper";
import PageWrapper from "@/components/Layout/PageWrapper";
import { ThemeProvider } from "./ThemeProvider";

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
    // <div className="flex">
    //   <SideNavar />
    //   <main className="flex-1">
    //     <MarginWidthWrapper>
    //       <Header />
    //       <HeaderMobile />
    //       <PageWrapper>{children}</PageWrapper>
    //     </MarginWidthWrapper>
    //   </main>
    // </div>

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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
    </ThemeProvider>
  );
}
