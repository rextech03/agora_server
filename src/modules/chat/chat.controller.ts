import { Request, Response, Router } from 'express';
import * as service from './chat.service';

const router = Router();

/**
 * POST /chat
 * Body: { patientId: number, clinicianId: number }
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const { patientId, clinicianId } = req.body;
    if (!patientId || !clinicianId) throw new Error('patientId and clinicianId required');

    const chatRoom = service.createChatRoom(patientId, clinicianId);
    res.json(chatRoom);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * POST /chat/:chatId/message
 * Body: { senderId: number, message: string }
 */
router.post('/:chatId/message', (req: Request, res: Response) => {
  try {
    const chatId = parseInt(req.params.chatId);
    const { senderId, message } = req.body;
    if (!senderId || !message) throw new Error('senderId and message required');

    const chatMessage = service.sendMessage(chatId, senderId, message);
    res.json(chatMessage);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /chat/:chatId/messages
 */
router.get('/:chatId/messages', (req: Request, res: Response) => {
  try {
    const chatId = parseInt(req.params.chatId);
    const messages = service.getMessages(chatId);
    res.json(messages);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export { router as chatRoutes };
