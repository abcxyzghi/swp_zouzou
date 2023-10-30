import { ROLE, TOKEN_INFO } from "../constants/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Navigate, useLocation } from "react-router-dom";
import { logout, setAuth } from "../slices/authSlice";

function CommonPrivateRouter(props) {
  const { targetRole } = props;
  // const { role } = useSelector((state) => state.auth);
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const location = useLocation();
  if (role !== targetRole) {
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default CommonPrivateRouter;
