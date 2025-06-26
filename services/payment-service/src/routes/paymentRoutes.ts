import { Router } from 'express';
import PaymentController from '../controllers/paymentController';

const router = Router();
const paymentController = new PaymentController();

const {
    createQRPayment,
    checkPaymentStatus
} = paymentController;

router.post("/create-qr", createQRPayment.bind(paymentController));
router.get("/check-payment-vnpay", checkPaymentStatus.bind(paymentController));

export { router as paymentRouter }; 