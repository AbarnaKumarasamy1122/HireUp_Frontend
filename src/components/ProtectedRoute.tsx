import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  role,
}: any) => {

  const user = JSON.parse(
    sessionStorage.getItem("user") || "null"
  );

  if (!user) {

    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {

    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;