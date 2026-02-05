/**
 * Redux Auth Persistence Middleware
 * Automatically syncs auth state with sessionStorage
 */

export const authPersistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Persist token and role to sessionStorage whenever auth changes
  if (
    action.type.startsWith("auth/") &&
    (action.type === "auth/setAuth" ||
      action.type === "auth/fetchUserData/fulfilled")
  ) {
    const { token, role } = state.auth;
    if (token) {
      sessionStorage.setItem("token", token);
      if (role) sessionStorage.setItem("role", role);
    }
  }

  // Clear sessionStorage on logout
  if (action.type === "auth/clearAuth") {
    sessionStorage.clear();
  }

  return result;
};
