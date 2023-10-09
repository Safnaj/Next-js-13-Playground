import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
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
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessages,
      });
      console.log(error);
    }
  };
  const signup = async () => {};

  return { signin, signup };
};

export default useAuth;
