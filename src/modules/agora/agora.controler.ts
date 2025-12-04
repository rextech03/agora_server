import { Request, Response, Router } from 'express';
import { generateRtcToken } from './agoraTokenService';

const router = Router();

/**
 * POST /agora/rtc-token
 * Body: { channelName: string, uid?: number, expireSeconds?: number }
 */
router.post('/rtc-token', (req: Request, res: Response) => {
  try {
    const { channelName, uid, expireSeconds } = req.body;
    if (!channelName) throw new Error('channelName is required');

    const tokenData = generateRtcToken({ channelName, uid, expireSeconds });
    res.json(tokenData);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export { router as agoraRoutes };
