import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/useUserStore"
import PropTypes from "prop-types";
import { useModalStore } from "../store/useModalStore";


export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUserStore((state) => ({
    isAuthenticated: state.isAuthenticated
  }));



  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element
}