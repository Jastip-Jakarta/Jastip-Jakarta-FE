import { SIDEBAR_ADMIN_SUPER } from "@/utils/constants/sidebar";
import { useAuth } from "@/utils/context/auth";
import { PanelLeftClose, PanelLeftOpen, Pencil } from "lucide-react";
import EditProfile from "./EditProfile";
import { updateProfileUser } from "@/utils/apis/user/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import profileImg from "../../public/images/profilejpg.jpg";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const SidebarAdmin = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const { user, changeToken } = useAuth();
  const { pathname } = useLocation();
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  const onUpdateImage = async (e: any) => {
    setIsLoadingUpload(true);

    try {
      const result = await updateProfileUser({
        image: e.target.files[0],
        isAdmin: true,
      });
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingUpload(false);
    }
  };

  const onHideSide = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    setIsOpenEditProfile(false);
  };

  const onLogout = () => {
    changeToken();
    navigate("/admin/login");
  };

  return (
    <>
      {isLoadingUpload ? <Loading /> : null}
      <div
        className={"bg-slate-100 duration-200 h-screen max-w-sm sticky top-0"}
        style={{
          width: `${isOpen ? "100" : "8"}%`,
        }}
      >
        <div className={` flex flex-col items-center justify-center min-h-full gap-10 relative`}>
          {/* Button hide */}
          {isOpen ? (
            <PanelLeftClose
              className="absolute top-4 right-4 size-8 cursor-pointer"
              onClick={onHideSide}
            />
          ) : (
            <PanelLeftOpen
              className="absolute top-4 right-4 size-8 cursor-pointer"
              onClick={onHideSide}
            />
          )}

          {/* Profile section */}
          {isOpen ? (
            <div className="flex flex-col items-center gap-5 ">
              <label htmlFor="update-image" className="relative cursor-pointer">
                <img
                  src={user.photo_profile ? user.photo_profile : profileImg}
                  alt="profile_image"
                  className={`size-32 rounded-full border object-cover`}
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
              <h3 className="text-xl font-semibold">Halo, {user.name}</h3>
            </div>
          ) : (
            <img
              src={user.photo_profile ? user.photo_profile : profileImg}
              alt="profile_image"
              className={`size-16 rounded-full border object-cover`}
            />
          )}

          <div className={`flex flex-col ${!isOpen ? "items-center" : ""} gap-5 w-full px-8`}>
            {isOpenEditProfile ? (
              <EditProfile isOpen={isOpenEditProfile} onClose={() => setIsOpenEditProfile(false)} />
            ) : (
              <>
                {SIDEBAR_ADMIN_SUPER.map((value) => {
                  return (
                    <div
                      key={value?.title}
                      className={`flex items-center
                         ${!isOpen ? "justify-center" : "justify-start"}
                        ${pathname === value.path ? "font-semibold bg-slate-200" : "font-normal"}
                         gap-5 hover:bg-slate-200 rounded-md cursor-pointer py-2 duration-200 min-w-14 px-2`}
                      onClick={() => {
                        switch (value && value.title) {
                          case "Admin":
                            if (!isOpen) {
                              setIsOpen(true);
                            }
                            setIsOpenEditProfile(true);
                            break;
                          case "Orderan Jastip":
                            navigate("/admin/orders");
                            break;
                          case "Dashboard":
                            navigate("/admin/dashboard");
                            break;
                          case "Batch Pengiriman":
                            navigate("/admin/batch-pengiriman");
                            break;
                          case "Kode wilayah":
                            navigate("/admin/kode-wilayah");
                            break;
                          case "Users":
                            navigate("/admin/users");
                            break;
                          case "Keluar":
                            onLogout();
                            break;
                          default:
                            break;
                        }
                      }}
                    >
                      {value?.icon("size-10")}
                      {isOpen ? <span className={`text-base`}>{value?.title}</span> : null}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
