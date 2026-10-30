import { Navigate, useLocation, useParams } from "react-router-dom";

const ProtectedRoute = ({
  children,
  role,
}: any) => {

  const location = useLocation();
  const params = useParams();

  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!storedUser || !token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  // ROLE CHECK
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  // COMPANY VALIDATION
  if (
    role === "company" &&
    params.id &&
    Number(params.id) !== Number(user.id)
  ) {
    return <Navigate to="/login" replace />;
  }

  // CANDIDATE VALIDATION
  if (
    role === "candidate" &&
    params.id &&
    Number(params.id) !== Number(user.id)
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;