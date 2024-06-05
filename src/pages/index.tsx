import { Button } from "@/components/ui/button";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const Homepage = () => {
  return (
    <div className="bg-black/80">
      <div className="flex items-center justify-center max-w-[500px]  mx-auto bg-slate-200 min-h-screen overflow-y-auto text-black ">
        <div className="flex flex-col gap-5 max-w-sm w-full">
          <h2 className="font-bold text-[40px]">Butuh JASTIP JAKARTA?</h2>
          <span className="font-semibold text-black/50">disini aja</span>
          <Login>
            <Button>Masuk</Button>
          </Login>
          <Register>
            <Button>Daftar</Button>
          </Register>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
