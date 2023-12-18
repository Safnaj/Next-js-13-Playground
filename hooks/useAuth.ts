import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({ loading: true, data: null, error: null });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({ loading: false, data: response.data, error: null });
      handleClose(); // Close Modal after successful login
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessages,
      });
      console.log(error);
    }
  };

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({ loading: true, data: null, error: null });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }
      );
      setAuthState({ loading: false, data: response.data, error: null });
      handleClose(); // Close Modal after successful login
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessages,
      });
      console.log(error);
    }
  };

  const signout = () => {
    deleteCookie("jwt");

    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return { signin, signup, signout };
};

export default useAuth;
