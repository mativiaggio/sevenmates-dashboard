import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import SideNavar from "../SideNavbar/SideNavbar";
import Header from "@/components/Header/Header";
import HeaderMobile from "@/components/Header/HeaderMobile";
import MarginWidthWrapper from "@/components/Layout/MarginWidthWrapper";
import PageWrapper from "@/components/Layout/PageWrapper";
import { ThemeProvider } from "./ThemeProvider";
import Login from "./Login";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <Login />
      </>
    );
  }
  return (
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
