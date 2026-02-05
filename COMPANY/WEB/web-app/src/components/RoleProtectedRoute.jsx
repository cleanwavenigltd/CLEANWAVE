import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { userData, role, isLoading, status } = useSelector(
    (state) => state.auth,
  );
  const token = sessionStorage.getItem("token");

  // No token = not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Still loading user data
  if ((isLoading || status === "loading") && !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#8CA566] rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading Cleanwave...</p>
        </div>
      </div>
    );
  }

  // Check if user role is allowed
  const userRole = userData?.role || role;
  if (!userRole || !allowedRoles.includes(userRole)) {
    console.warn(
      `Access denied for role: ${userRole}. Allowed: ${allowedRoles}`,
    );
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
