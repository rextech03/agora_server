import { Request, Response, Router } from 'express';
import { createVideoSession } from './consultation.service';

/**
 * POST /consultation/video-token
 * Body: { channelName: string, uid?: number }
 */

export const consultationRoutes = Router();
consultationRoutes.post('/video-token', (req: Request, res:Response) => {
  try {
    const { channelName, uid } = req.body;
    if (!channelName) throw new Error('channelName is required');

    const tokenData = createVideoSession(channelName, uid);
    res.json(tokenData);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

