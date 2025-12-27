import { Router } from "express";
import PaymentController from "../controllers/paymentController";

const router = Router();
const paymentController = new PaymentController();

const {
  createQRPayment,
  checkPaymentStatus,
  createQRDirectPayment,
  checkDirectPaymentStatus,
} = paymentController;

router.post("/create-qr", createQRPayment.bind(paymentController));
router.get("/check-payment-vnpay", checkPaymentStatus.bind(paymentController));
router.post(
  "/create-qr-direct-payment",
  createQRDirectPayment.bind(paymentController)
);
router.get(
  "/check-direct-payment-status",
  checkDirectPaymentStatus.bind(paymentController)
);

export { router as paymentRouter };
