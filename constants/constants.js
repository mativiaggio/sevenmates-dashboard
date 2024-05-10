import {
  Home,
  Archive,
  List,
  ListChecks,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { ModeToggle } from "@/components/ModeToggler/ModeToggler";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import UserCard from "@/components/User/UserCard";
import UserImage from "@/components/User/UserImage";
import LogoutButton from "@/components/User/LogoutButton";

export const SIDENAV_ITEMS = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Home />,
  },
  {
    title: "Productos",
    path: "/products",
    icon: <Archive />,
  },
  {
    title: "Categorías",
    path: "/categories",
    icon: <List />,
  },
  {
    title: "Pedidos",
    path: "/orders",
    icon: <ListChecks />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings />,
    submenu: true,
    subMenuItems: [
      {
        title: "Admins",
        path: "/settings/admins",
      },
      {
        title: "Account",
        path: "/settings/account",
      },
    ],
  },
  {
    title: <ModeToggle />,
    path: "",
    icon: (
      <>
        <Moon className="h-[24px] w-[24px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Sun className="absolute h-[24px] w-[24px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </>
    ),
  },
  {
    title: <UserCard />,
    path: "",
    icon: <UserImage />,
    submenu: true,
    subMenuItems: [
      {
        title: <LogoutButton />,
        path: "",
      },
    ],
  },
];
