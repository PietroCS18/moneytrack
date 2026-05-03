import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function register(data) {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("Todos os campos são obrigatórios");
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 🔥 não retornar a senha
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

export async function login(data) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Credenciais inválidas");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
}