// src/hooks/useAuth.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../features/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(setUser({ token }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return user;
};

export default useAuth;
