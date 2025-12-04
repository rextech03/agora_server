import { Router, Request, Response } from 'express';
import * as service from './paystack.service';

const router = Router();

/**
 * POST /payments/initialize
 * Body: { email: string, amount: number, reference?: string, callback_url?: string }
 */
router.post('/initialize', async (req: Request, res: Response) => {
  try {
    const data = await service.initializePayment(req.body);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /payments/verify/:reference
 */
router.get('/verify/:reference', async (req: Request, res: Response) => {
  try {
    const data = await service.verifyPayment(req.params.reference);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export { router as paystackRoutes };
