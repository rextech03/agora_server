import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

// Simple in-memory users (replace with DB in production)
const users: any[] = [];

export const register = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, password: hashed };
  users.push(user);
  return { id: user.id, email: user.email };
};

export const login = async (email: string, password: string) => {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user.id, email: user.email },
    env.JWT_SECRET as any,
    { expiresIn: env.JWT_EXPIRES_IN as any }
  );
  return { token, user: { id: user.id, email: user.email } };
};
