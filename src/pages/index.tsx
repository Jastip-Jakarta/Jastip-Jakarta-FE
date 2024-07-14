import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import { useState } from "react";

const Homepage = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  return (
    <div className="bg-black/20">
      <div className="relative flex items-center justify-center max-w-[500px] mx-auto bg-slate-100 min-h-screen text-black ">
        <div className="flex flex-col gap-5 max-w-sm w-full px-4 sm:px-0">
          <h2 className="font-bold text-4xl sm:text-[40px]">Butuh JASTIP JAKARTA?</h2>
          <span className="font-semibold text-zinc-800">disini aja</span>
          <Button onClick={() => setIsOpenLogin(true)} className="w-full">
            Masuk
          </Button>
          <Modal isOpen={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
            <Login onClose={() => setIsOpenLogin(false)} />
          </Modal>

          <Button onClick={() => setIsOpenRegister(true)} className="w-full">
            Daftar
          </Button>
          <Modal isOpen={isOpenRegister} onClose={() => setIsOpenRegister(false)}>
            <Register onClose={() => setIsOpenRegister(false)} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
