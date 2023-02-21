import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../app/api/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "User";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) {
      status = "Manager";
    }

    if (isAdmin) {
      status = "Admin";
    }

    return { username, roles, isManager, isAdmin, status };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};

export default useAuth;
