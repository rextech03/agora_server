import { Request, Response } from 'express';
import * as service from './auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const data = await service.register(req.body.email, req.body.password);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await service.login(req.body.email, req.body.password);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
