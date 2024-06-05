import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { IUser } from "../apis/user/types";
import axiosWithConfig, { setAxiosConfig } from "../apis/axios-with-config";
import { getUser } from "../apis/user/api";
import toast from "react-hot-toast";

interface AuthState {
  token: string;
  user: Partial<IUser>;
  changeToken(token?: string): void;
}

const initialState: AuthState = {
  token: "",
  user: {},
  changeToken: () => {},
};

const AuthContext = createContext(initialState);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [user, setUser] = useState<Partial<IUser>>({});

  useEffect(() => {
    setAxiosConfig(token);
    token !== "" && fetchUser();
  }, [token]);

  axiosWithConfig.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response.status === 401) {
        console.log("Silahkan Login kembali");
      }
      return Promise.reject(error);
    }
  );

  const fetchUser = async () => {
    try {
      const result = await getUser();
      setUser(result.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const changeToken = (token?: string) => {
    const newToken = token ?? "";
    setToken(newToken);
    if (token) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
      setUser({});
    }
  };
  const contextValue = {
    token,
    user,
    changeToken,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
