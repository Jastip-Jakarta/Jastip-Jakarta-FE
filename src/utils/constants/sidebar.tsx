import {
  Boxes,
  Code,
  LayoutDashboard,
  LogOut,
  Package2,
  ShieldQuestion,
  Smile,
  Users,
} from "lucide-react";

export const SIDEBAR = [
  {
    title: "Profile saya",
    icon: ({ className }: any) => <Smile className={className} />,
  },
  {
    title: "Orderan saya",
    icon: ({ className }: any) => <Package2 className={className} />,
  },
  {
    title: "Kode wilayah",
    icon: ({ className }: any) => <Code className={className} />,
  },
  {
    title: "Cara JASTIP",
    icon: ({ className }: any) => <ShieldQuestion className={className} />,
  },
  ,
  {
    title: "Keluar",
    icon: ({ className }: any) => <LogOut className={className} />,
  },
];

export const SIDEBAR_ADMINJ = [
  {
    title: "Profile saya",
    icon: ({ className }: any) => <Smile className={className} />,
  },
  {
    title: "Orderan jastip",
    icon: ({ className }: any) => <Package2 className={className} />,
  },
  {
    title: "Keluar",
    icon: ({ className }: any) => <LogOut className={className} />,
  },
];

export const SIDEBAR_ADMINP = [
  {
    title: "Profile saya",
    icon: ({ className }: any) => <Smile className={className} />,
  },
  {
    title: "Orderan jastip",
    icon: ({ className }: any) => <Package2 className={className} />,
  },
  {
    title: "Batch pengiriman",
    icon: ({ className }: any) => <Package2 className={className} />,
  },
  {
    title: "Keluar",
    icon: ({ className }: any) => <LogOut className={className} />,
  },
];

export const SIDEBAR_ADMIN_SUPER = [
  {
    title: "Admin",
    icon: ({ className }: any) => <Smile className={className} />,
  },
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: ({ className }: any) => <LayoutDashboard className={className} />,
  },
  {
    title: "Orderan Jastip",
    path: "/admin/orders",
    icon: ({ className }: any) => <Package2 className={className} />,
  },
  {
    title: "Batch Pengiriman",
    path: "/admin/batch-pengiriman",
    icon: ({ className }: any) => <Boxes className={className} />,
  },

  {
    title: "Kode wilayah",
    path: "/admin/kode-wilayah",
    icon: ({ className }: any) => <Code className={className} />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: ({ className }: any) => <Users className={className} />,
  },
  {
    title: "Keluar",
    path: "admin",
    icon: ({ className }: any) => <LogOut className={className} />,
  },
];
