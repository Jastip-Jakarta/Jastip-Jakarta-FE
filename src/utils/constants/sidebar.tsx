import { Code, LogOut, Package2, ShieldQuestion, Smile } from "lucide-react";

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
