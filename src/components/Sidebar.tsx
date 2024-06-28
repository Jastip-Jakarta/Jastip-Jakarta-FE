import { SIDEBAR } from "@/utils/constants/sidebar";
import { useAuth } from "@/utils/context/auth";
import { Pencil, X } from "lucide-react";
import EditProfile from "./EditProfile";
import { updateProfileUser } from "@/utils/apis/user/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const { user, changeToken } = useAuth();
  const [imgUrl, setImgUrl] = useState("");
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  const onUpdateImage = async (e: any) => {
    setIsLoadingUpload(true);
    try {
      setImgUrl(URL.createObjectURL(e.target.files![0]));
      const result = await updateProfileUser({ image: e.target.files[0] });
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingUpload(false);
    }
  };

  const onCloseSidebar = () => {
    setIsOpen(false);
    setIsOpenEditProfile(false);
  };

  const onLogout = () => {
    changeToken();
    navigate("/");
  };

  return (
    <>
      {isLoadingUpload ? <Loading /> : null}
      <div
        className={`fixed inset-0 bg-slate-100 z-50 duration-200 `}
        style={{
          width: `${isOpen ? "100" : "0"}%`,
        }}
      >
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } flex flex-col items-center justify-center min-h-full gap-10`}
        >
          <X className="absolute top-4 right-4 size-8 cursor-pointer" onClick={onCloseSidebar} />
          <div className="flex flex-col items-center gap-5 ">
            <label htmlFor="update-image" className="relative cursor-pointer">
              <img
                src={
                  imgUrl
                    ? imgUrl
                    : user.photo_profile
                    ? user.photo_profile
                    : "https://source.unsplash.com/100x100?people"
                }
                alt="profile_image"
                className="size-40 rounded-full border"
              />
              <Pencil className="absolute bottom-0 right-2" />
            </label>
            <input
              type="file"
              hidden
              id="update-image"
              onChange={(e) => {
                onUpdateImage(e);
              }}
            />
            <h3 className="text-2xl font-semibold">Halo, {user.name}</h3>
          </div>
          <div className="flex flex-col gap-5 w-full px-8">
            {isOpenEditProfile ? (
              <EditProfile isOpen={isOpenEditProfile} onClose={() => setIsOpenEditProfile(false)} />
            ) : (
              <>
                {SIDEBAR.map((value) => (
                  <div
                    key={value?.title}
                    className="flex items-center gap-5 hover:bg-black/10 rounded-sm cursor-pointer py-2 duration-200"
                    onClick={() => {
                      switch (value && value.title) {
                        case "Keluar":
                          onLogout();
                          break;
                        case "Profile saya":
                          setIsOpenEditProfile(true);
                          break;
                        case "Orderan saya":
                          navigate("/orders");
                          setIsOpen(false);
                          break;
                        case "Kode wilayah":
                          navigate("/kode-wilayah");
                          break;

                        default:
                          break;
                      }
                    }}
                  >
                    {value?.icon("size-10")}
                    <span className="text-lg">{value?.title}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
