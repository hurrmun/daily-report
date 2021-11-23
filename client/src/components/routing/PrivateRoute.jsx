import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("authToken");
  return auth ? <Outlet /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
