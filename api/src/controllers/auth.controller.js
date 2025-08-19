import {
  deletetheUser,
  loginUser,
  registerUser,
  getUserInfoService,
  resetuserPassword,
  updatetheUser,
  updatetheName,
} from '../services/auth.service.js';

export const getUserInfo = async (req, res) => {
  try {
    const user = req.userId;
    const response = await getUserInfoService(user);

    return res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
    }

    const response = await registerUser(name, email, password);
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }

    const response = await loginUser(email, password);
    if (response.status !== 200) {
      return res.status(response.status).json(response);
    }

    res.cookie('token', response.data.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 360000,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const logout = async (req, res) => {
  try {
    if (req) {
      res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });
    }
    return res.status(200).json({ message: 'Logout bem sucedido!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    if (!email || !password || !newPassword) {
      return res.status(400).json({ message: 'E-mail, senha e nova senha são obrigatórios!' });
    }

    const response = await resetuserPassword(email, password, newPassword);
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Os campos acima são obrigatórios!' });
    }

    const response = await deletetheUser(email, password, confirmPassword);
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, newEmail, password } = req.body;
    if (!email || !newEmail || !password) {
      return res.status(400).json({ message: 'Os campos acima são obrigatórios' });
    }

    const response = await updatetheUser(email, newEmail, password);
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updateName = async (req, res) => {
  try {
    const { name: newName } = req.body;
    if (!newName) {
      return res.status(400).json({ message: 'Precisa de um nome válido!' });
    }

    const user = req.userId;
    const response = await updatetheName(newName, user);
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
