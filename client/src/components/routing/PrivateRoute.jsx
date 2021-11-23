import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("authToken");
  return auth ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
