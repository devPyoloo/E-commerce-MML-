import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthStore } from "../store/useAuthStore";


export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore.getState();



  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element
}