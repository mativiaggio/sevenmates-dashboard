import AsideNav from "@/components/AsideNav/AsideNav";
import Layout from "@/components/Layout/Layout";
import UserCard from "@/components/User/UserCard";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Layout></Layout>
    </>
  );
}
