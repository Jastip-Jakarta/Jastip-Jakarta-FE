import LayoutAdmin from "@/components/LayoutAdmin";
import SearchOrder from "@/components/SearchOrder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FORM_ADD_USER } from "@/utils/constants/add-order";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { IUserForAdminSuper } from "@/utils/apis/admin/types";
import { addNewUserByAdminSuper, getUsersForAdminSuper, searchUserForAdmin } from "@/utils/apis/admin/api";
import defaultImg from "../../../../public/images/profilejpg.jpg";
import { useForm } from "react-hook-form";
import { IRegisterType, RegisterSchema } from "@/utils/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";

const Users = () => {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState<IUserForAdminSuper[]>();
  const [isOpenAddEditUser, setIsOpenAddEditUser] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (keyword.length < 1) {
      getUsers();
    }
  }, [keyword]);

  const onSubmitAddUser = handleSubmit(async (body: IRegisterType) => {
    try {
      const result = await addNewUserByAdminSuper(body);
      setIsOpenAddEditUser(false);
      getUsers();
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  const columns: ColumnDef<IUserForAdminSuper>[] = [
    {
      id: "group",

      header: ({ table }) => {
        return (
          <div className="text-sm text-muted-foreground rounded-md h-12 pr-8 text-left flex items-center justify-between">
            <p>
              Showing {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} users.
            </p>
          </div>
        );
      },

      columns: [
        {
          accessorKey: "name",
          header: "Nama",
          cell: ({ row }) => {
            const data = row.original;
            return (
              <div className="flex items-center gap-x-5">
                <img
                  src={defaultImg}
                  alt="profile"
                  width={36}
                  height={36}
                  className="rounded-full size-12 object-cover object-center"
                />
                <span className="font-semibold">{data.name}</span>
              </div>
            );
          },
        },
        {
          accessorKey: "email",
          header: "Email",
        },
        {
          accessorKey: "phone_number",
          header: "Nomor Handphone",
          cell: ({ row }) => {
            const data = row.original;
            return <div>{`+${data.phone_number}`}</div>;
          },
        },
      ],
    },
  ];

  const getUsers = async () => {
    try {
      const result = await getUsersForAdminSuper();
      setUsers(result.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const searchUsers = async (e: any) => {
    e.preventDefault();
    try {
      if (!keyword.length) {
        toast.error("Ketikkan nama pengguna");
        return;
      }
      const result = await searchUserForAdmin(keyword);

      setUsers(result.data);
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
                <form onSubmit={onSubmitAddUser} className="space-y-2">
                  {FORM_ADD_USER.map((input) => (
                    <div className="space-y-1" key={input.label}>
                      <Label className="font-semibold">{input.label}</Label>
                      <Input
                        placeholder={input.placeholder}
                        {...register(input.formName as keyof typeof register)}
                      />
                      {errors?.[input.formName as keyof typeof errors] ? (
                        <p className="text-sm text-red-500 -mt-2">
                          {errors?.[input.formName as keyof typeof errors]?.message?.toString()}
                        </p>
                      ) : null}
                    </div>
                  ))}
                  <DialogFooter className="mt-5">
                    <Button type="submit" disabled={isSubmitting}>
                      Simpan
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <DataTable data={users ?? []} columns={columns} />
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
