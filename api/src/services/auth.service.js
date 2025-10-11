import bcrypt from 'bcryptjs';
import {
  findUserByEmail,
  createUser,
  updateUserPassword,
  findUserById,
  updatedeleteUser,
  generateToken,
  updateEmail,
  updateUsername,
} from '../repositories/auth.repository.js';

export const getUserInfoService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    return { status: 404, message: 'Usuário não encontrado!' };
  }
  const { password, ...userWithoutPassword } = user;
  return { status: 200, data: userWithoutPassword };
};

export const registerUser = async (name, email, password) => {
  if (password.length < 6) {
    return { status: 400, message: 'A senha deve ter pelo menos 6 caracteres!' };
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return { status: 400, message: 'Email já cadastrado!' };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await createUser(name, email, hashedPassword);

  const { password: _, ...userWithoutPassword } = newUser;
  return { status: 201, data: userWithoutPassword };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return { status: 404, message: 'Usuário não encontrado' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { status: 401, message: 'Credenciais inválidas' };
  }

  const token = generateToken(user.id);
  return { status: 200, data: { token, user } };
};

export const resetuserPassword = async (email, password, newPassword) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return { status: 404, message: 'Endereço de E-mail inválido' };
  }
  if (newPassword.length < 6) {
    return { status: 400, message: 'A nova senha tem que ter no mínimo 6 caracteres!' };
  }
  if (newPassword === password) {
    return { status: 400, message: 'Sua antiga senha e a nova senha não podem coincidir!' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { status: 401, message: 'Senha atual inválida!' };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user.id, hashedPassword);

  return { status: 200, message: 'Senha redefinida com sucesso!' };
};

export const deletetheUser = async (email, password, confirmPassword) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return { status: 404, message: 'Usuário não identificado' };
  }
  if (password !== confirmPassword) {
    return { status: 400, message: 'As senhas não coincidem!' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { status: 401, message: 'A senha atual da conta é diferente das senhas propostas!' };
  }

  await updatedeleteUser(user.id);
  return { status: 200, message: 'Sua conta foi apagada!' };
};

export const updatetheUser = async (email, newEmail, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return { status: 404, message: 'E-mail não encontrado!' };
  }
  if (email === newEmail) {
    return { status: 400, message: 'Seu antigo E-mail e o novo E-mail não podem coincidir!' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { status: 401, message: 'A senha está incorreta!' };
  }

  await updateEmail(user.id, newEmail);
  return { status: 200, message: 'E-mail alterado com sucesso!' };
};

export const updatetheName = async (newName, id) => {
  const user = await findUserById(id);
  if (!user) {
    return { status: 404, message: 'Usuário não encontrado!' };
  }

  await updateUsername(user.id, newName);
  return { status: 200, message: 'Nome alterado com sucesso!' };
};
