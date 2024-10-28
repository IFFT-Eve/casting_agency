import { useAuth0 } from "@auth0/auth0-react";
import { Backdrop, CircularProgress } from "@mui/material";
import { FC, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      localStorage.setItem("token", token);
    };
    if (!isAuthenticated) {
      return;
    }
    getToken();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};
