import prisma from '../config/prisma.js';
import jwt from 'jsonwebtoken';

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({ 
    where: {
      email,
    },
  });
  return user;
};

export const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

export const createUser = async (name, email, password) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      username: email,
      password,
      status: 'active',
    },
  });
  return user;
};

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export const updateUserPassword = async (id, newPassword) => {
  await prisma.user.update({
    where: { id: id },
    data: { password: newPassword },
  });
};

export const updatedeleteUser = async (id) =>
  await prisma.user.delete({
    where: { id: id },
  });

export const updateEmail = async (id, newEmail) => {
  await prisma.user.update({
    where: { id: id },
    data: { email: newEmail },
  });
};

export const updateUsername = async (id, newName) => {
  await prisma.user.update({
    where: { id: id },
    data: { name: newName },
  });
};
