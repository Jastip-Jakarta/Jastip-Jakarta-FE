import LayoutAdmin from "@/components/LayoutAdmin";
import SearchOrder from "@/components/SearchOrder";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FORM_ADD_USER } from "@/utils/constants/add-order";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Users = () => {
  const [users, setUsers] = useState<any[]>();
  const [keyword, setKeyword] = useState("");
  const [isOpenAddEditUser, setIsOpenAddEditUser] = useState(false);
  const [paginate, setPaginate] = useState<any>();
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const result = await axios.get("https://dummyjson.com/users");
      setUsers([...result.data.users]);
      setPaginate({ total: result.data.total, limit: result.data.limit, skip: result.data.skip });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const searchUsers = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.get(`https://dummyjson.com/users/search?q=${keyword}`);
      setUsers([...result.data.users]);
      setPaginate({ total: result.data.total, limit: result.data.limit, skip: result.data.skip });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <LayoutAdmin>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="space-y-3">
          <h1 className="font-semibold text-3xl">Users</h1>
          <div className="flex items-center gap-8">
            <SearchOrder
              onSubmit={searchUsers}
              setKeyword={setKeyword}
              placeholder="Cari user"
              className="ring-0 flex-1"
            />

            <Dialog open={isOpenAddEditUser} onOpenChange={setIsOpenAddEditUser}>
              <DialogTrigger asChild>
                <Button className="space-x-3">
                  <Plus />
                  <span>User baru</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogTitle className="text-xl font-medium">Tambah user baru</DialogTitle>
                <form onSubmit={() => {}} className="space-y-2">
                  {FORM_ADD_USER.map((input) => (
                    <div className="space-y-1" key={input.label}>
                      <Label className="font-semibold">{input.label}</Label>
                      <Input
                        placeholder={input.placeholder}
                        // {...register(input.formName as keyof typeof register)}
                      />
                      {/* {errors?.[input.formName as keyof typeof errors] ? (
                        <p className="text-sm text-red-500 -mt-2">
                          {errors?.[input.formName as keyof typeof errors]?.message?.toString()}
                        </p>
                      ) : null} */}
                    </div>
                  ))}
                  <DialogFooter className="mt-5">
                    <Button type="submit" /* disabled={isSubmitting} */>Simpan</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Table className="bg-slate-100 rounded-lg">
          <TableCaption>Daftar pengguna JASTIP.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>phone</TableHead>
              {/* <TableHead className="text-right">phone</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-right">{user.totalAmemailount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                {Math.floor(2 / (paginate?.total / paginate?.limit))} of{" "}
                {Math.floor(paginate?.total / paginate?.limit)} row(s) selected.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Jumlah user</TableCell>
              <TableCell className="text-right">{paginate?.total?.toString()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {/* <div className="space-y-3">
          {users?.map((user: any) => (
            <div key={user.id} className="bg-white px-3 py-4 rounded-md">
              <div className="flex">
                <img src={user.image} alt="" />
                <h3>{user.username}</h3>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </LayoutAdmin>
  );
};

export default Users;
