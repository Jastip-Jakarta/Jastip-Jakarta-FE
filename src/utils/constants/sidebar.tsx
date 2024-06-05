import { Code, Package2, ShieldQuestion, Smile } from "lucide-react";
import { ModalAction } from "../types/modal";

export const SIDEBAR = [
  {
    title: "Profile saya",
    icon: ({ className }: any) => <Smile className={className} />,
    action: { type: "OPEN_EDIT_PROFILE" } as ModalAction,
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
];
