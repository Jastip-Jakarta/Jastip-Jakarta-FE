import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/utils/helpers";

interface SearchOrderProps {
  onSubmit: (e: any) => Promise<void>;
  setKeyword: (keyword: string) => void;
  className?: string;
  placeholder?: string;
}
const SearchOrder = ({ onSubmit, setKeyword, className, placeholder }: SearchOrderProps) => {
  return (
    <>
      {/*SECTION SEARCH */}
      <form
        onSubmit={onSubmit}
        className={cn(
          "flex items-center bg-white  pl-3 pr-1 py-1 rounded-full overflow-hidden ring ring-[#FCCA8F]",
          className
        )}
      >
        <Search />
        <Input
          className="border-none "
          placeholder={placeholder ?? "Cari order titipan kamu"}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button className="!w-[134px] rounded-full" type="submit">
          Search
        </Button>
      </form>
    </>
  );
};

export default SearchOrder;
