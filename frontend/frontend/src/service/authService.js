import api from "../api/api.js";

export const register = async (userData) => {
  return await api.post("auth/register", userData);
};

export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  
  // Salva token e refreshToken no localStorage se estiverem presentes
  if (response.data?.token) {
    localStorage.setItem('token', response.data.token);
  }
  if (response.data?.refreshToken) {
    localStorage.setItem('refreshToken', response.data.refreshToken);
  }
  
  return response;
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('Refresh token não encontrado');
  }
  
  const response = await api.post("auth/refresh", { refreshToken });
  
  // Atualiza os tokens no localStorage
  if (response.data?.token) {
    localStorage.setItem('token', response.data.token);
  }
  if (response.data?.refreshToken) {
    localStorage.setItem('refreshToken', response.data.refreshToken);
  }
  
  return response;
};

export const getUserProfile = async () => {
  return await api.get("auth/me");
};

export const logout = async () => {
  const response = await api.post("auth/logout");
  
  // Limpa os tokens do localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  
  return response;
};

export const resetPassword = async (userData) => {
  return await api.post("auth/reset-password", userData);
};
