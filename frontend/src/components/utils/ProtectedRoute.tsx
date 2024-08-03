import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { isExpired } from "react-jwt";
import { refreshToken } from "@/Redux/Slices/AuthSlice";
import { useState } from "react";

type ProtectedRoute = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const user = useSelector(
    (state: { auth: { isAuthenticated: boolean; accessToken: string } }) =>
      state.auth
  );
  const accessToken = useSelector(
    (state: { auth: { isAuthenticated: boolean; accessToken: string } }) =>
      state.auth.accessToken
  );
  const [isTokenExpired, setIsTokenExpired] = useState(isExpired(accessToken));
  const location = useLocation();
  const dispatch = useDispatch();
  if (isTokenExpired) {
    const tryToRefresh = async () => {
      const res = await dispatch(
        //@ts-expect-error TODO: Fix type annotations later
        refreshToken()
      );
      if (res.payload.accessToken && res.payload.refreshToken) {
        setIsTokenExpired(false);
      }
    };
    tryToRefresh();
  }

  if (!user.isAuthenticated || isTokenExpired) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, previousLocationPathname: location.pathname }}
        replace
      />
    );
  }
  return children;
};

export default ProtectedRoute;
