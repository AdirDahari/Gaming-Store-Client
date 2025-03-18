import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../router/ROUTES";

const AdminGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  if (userData && userData.isAdmin) {
    return children;
  } else {
    return <Navigate to={ROUTES.HOME} replace={true} />;
  }
};

export default AdminGuard;
