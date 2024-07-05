import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchOrderProps {
  onSubmit: (e: any) => Promise<void>;
  setKeyword: (keyword: string) => void;
}
const SearchOrder = ({ onSubmit, setKeyword }: SearchOrderProps) => {
  return (
    <>
      {/*SECTION SEARCH */}
      <form
        onSubmit={onSubmit}
        className="flex items-center bg-white  pl-3 pr-1 py-1 rounded-full overflow-hidden ring ring-[#FCCA8F]"
      >
        <Search />
        <Input
          className="border-none "
          placeholder="Cari order titipan kamu"
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
