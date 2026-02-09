import { jwtDecode } from "jwt-decode";

/**
 * Reads the token from localStorage and returns the decoded user
 * If token is expired or invalid, it will be removed automatically.
 */
export const loginUser = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    if (isTokenExpired(decoded)) {
      sessionStorage.removeItem("token");
      return null;
    }

    return decoded; // { userId, role, iat, exp }
  } catch {
    // Token is invalid or corrupted
    sessionStorage.removeItem("token");
    return null;
  }
};

/**
 * Checks if a JWT token is expired based on the 'exp' field.
 */
export const isTokenExpired = (decodedToken) => {
  if (!decodedToken?.exp) return true;
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

/**
 * Logs the user out and redirects to the login page.
 */
export const logout = () => {
  sessionStorage.removeItem("token");
  window.location.replace("/"); // cleaner, prevents back navigation
};
