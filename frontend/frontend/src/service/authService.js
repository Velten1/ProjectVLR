import api from "../api/api.js";

export const register = async (userData) => {
  return await api.post("auth/register", userData);
};

export const login = async (userData) => {
  return await api.post("/auth/login", userData);
};

export const getUserProfile = async () => {
  return await api.get("auth/me");
};

export const logout = async () => {
  return await api.post("auth/logout");
};

export const resetPassword = async (userData) => {
  return await api.post("auth/reset-password", userData);
};
