import { SIDEBAR } from "@/utils/constants/sidebar";
import { useAuth } from "@/utils/context/auth";
import { useModal } from "@/utils/context/modal";
import { X } from "lucide-react";
import EditProfile from "./EditProfile";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { user } = useAuth();
  const { state, dispatch } = useModal();

  const onClose = () => {
    setIsOpen(false);
    dispatch({ type: "CLOSE_EDIT_PROFILE" });
  };
  return (
    <div
      className={`absolute inset-y-0 bg-slate-100 z-50 duration-200 `}
      style={{
        width: `${isOpen ? "90" : "0"}%`,
      }}
    >
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } flex flex-col items-center justify-center min-h-full gap-10`}
      >
        <X className="absolute top-4 right-4 size-8 cursor-pointer" onClick={onClose} />
        <div className="flex flex-col items-center gap-5">
          <img
            src={
              user.photo_profile ? user.photo_profile : "https://source.unsplash.com/100x100?people"
            }
            alt="profile_image"
            className="size-40 rounded-full "
          />
          <h3 className="text-2xl font-semibold">Halo, {user.name}</h3>
        </div>
        <div className="flex flex-col gap-5 w-full px-8">
          {state.isOpenEditProfile ? (
            <EditProfile />
          ) : (
            <>
              {SIDEBAR.map((value) => (
                <div
                  key={value.title}
                  className="flex items-center gap-5 hover:bg-black/10 rounded-sm cursor-pointer py-2 duration-200"
                  onClick={() => {
                    if (value.action) {
                      dispatch(value.action);
                    }
                  }}
                >
                  {value.icon("size-10")}
                  <span className="text-lg">{value.title}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
