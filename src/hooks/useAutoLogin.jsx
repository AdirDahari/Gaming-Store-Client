import { jwtDecode } from "jwt-decode";
import { authActions } from "../store/authSlice";
import { clearToken, getToken } from "../service/storeService";
import { useDispatch } from "react-redux";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      const token = getToken();
      if (!token) return;
      const dataFromToken = jwtDecode(token);

      dispatch(authActions.login(dataFromToken));
    } catch (err) {
      console.log("Error from useAutoLogin", err);
      clearToken();
    }
  };
};

export default useAutoLogin;
