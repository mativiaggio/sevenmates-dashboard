import { Home, Archive, List, ListChecks, Settings } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggler/ModeToggler";

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
    icon: "",
  },
];
