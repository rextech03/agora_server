import axios from 'axios';
import { env } from '../../config/env';

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export interface InitializePaymentRequest {
  email: string;
  amount: number; // in Naira, e.g. 20000 for ₦200
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
}

export interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data?: any;
}

/**
 * Initialize a payment
 */
export const initializePayment = async (payload: InitializePaymentRequest) => {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email: payload.email,
        amount: payload.amount * 100, // convert to kobo
        reference: payload.reference,
        callback_url: payload.callback_url,
        metadata: payload.metadata
      },
      {
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Verify a payment
 */
export const verifyPayment = async (reference: string): Promise<VerifyPaymentResponse> => {
  try {
    const response = await axios.get<VerifyPaymentResponse>(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
