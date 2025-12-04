import express from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/auth.routes';
import { chatRoutes } from './modules/chat/chat.controller';
import { agoraRoutes } from './modules/agora/agora.controler';
import { paystackRoutes } from './modules/payments/paystack.controller';


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/agora', agoraRoutes);
app.use('/payments', paystackRoutes);

app.get('/', (req, res) => res.send('TalkToMed Backend Running'));

export default app;
