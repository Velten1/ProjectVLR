import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3070/api/",
  withCredentials: true,
});

// Flag para evitar múltiplas tentativas de refresh simultâneas
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Interceptor de Request: Adiciona token no header se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Response: Detecta token expirado e renova automaticamente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Se o erro não for 401 ou já tentou refresh, rejeita normalmente
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Verifica se é erro de token expirado
    const isTokenExpired = error.response?.data?.expired === true || 
                          error.response?.data?.code === 'TOKEN_EXPIRED';

    if (isTokenExpired) {
      // Se já está tentando refresh, adiciona à fila
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Tenta renovar o token
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // Se não tem refresh token, limpa tudo e redireciona para login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          processQueue(new Error('Refresh token não encontrado'), null);
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Chama o endpoint de refresh usando axios direto para evitar loop
        const response = await axios.post(
          'http://localhost:3070/api/auth/refresh',
          { refreshToken },
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const { token: newToken, refreshToken: newRefreshToken } = response.data;

        // Atualiza os tokens no localStorage
        localStorage.setItem('token', newToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Processa a fila de requisições pendentes
        processQueue(null, newToken);

        // Reenvia a requisição original
        return api(originalRequest);
      } catch (refreshError) {
        // Se o refresh falhou, limpa tudo e redireciona para login
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        
        // Redireciona para login apenas se não estiver já na página de login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
