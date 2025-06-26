import { Request, Response } from 'express';
import { HashAlgorithm, VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from 'vnpay';
import axios from 'axios';

class PaymentController {
    async createQRPayment(req: Request, res: Response) {
        try {
            const tmnCode = process.env.VNPAY_TMN_CODE;
            const secureSecret = process.env.VNPAY_SECRET;

            if (!tmnCode || !secureSecret) {
                return res.status(500).json({
                    error: 'VNPAY_TMN_CODE or VNPAY_SECRET is not set in environment variables.'
                });
            }

            const vnpay = new VNPay({
                tmnCode,
                secureSecret,
                vnpayHost: "https://sandbox.vnpayment.vn",
                testMode: true,
                hashAlgorithm: HashAlgorithm.SHA512,
                loggerFn: ignoreLogger,
            });

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const {
                CartID,
                totalPrice
            } = req.body;

            const vnpayResponse = await vnpay.buildPaymentUrl({
                vnp_Amount: totalPrice,
                vnp_IpAddr: "127.0.0.1",
                vnp_TxnRef: CartID,
                vnp_OrderInfo: `Payment for cart ${CartID}`,
                vnp_OrderType: ProductCode.Other,
                vnp_ReturnUrl: `http://localhost:5009/api/payment/check-payment-vnpay?cartID=${CartID}`,
                vnp_Locale: VnpLocale.VN,
                vnp_CreateDate: dateFormat(new Date()),
                vnp_ExpireDate: dateFormat(tomorrow),
            });

            return res.status(201).json({ paymentUrl: vnpayResponse });
        } catch (error) {
            res.status(500).json({ message: "Error creating QR payment", error });
        }
    }

    async checkPaymentStatus(req: Request, res: Response) {
        try {
            const { cartID } = req.query;
            if (!cartID) {
                return res.status(400).json({ message: "Missing cartID" });
            }

            // 1. Get cart details
            const cartRes = await axios.get(`http://localhost:5008/api/carts/${cartID}`);
            const cart = cartRes.data;

            // 2. Update PAYMENT_STATUS to "paid"
            await axios.put(`http://localhost:5008/api/carts/${cartID}`, {
                PAYMENT_STATUS: "paid"
            });

            // Simple ID generator
            function generateEnrollmentId() {
                return 'E' + Date.now() + Math.floor(Math.random() * 10000);
            }

            // 3. Create new enrollment(s) for each course in the cart
            await Promise.all(
                cart.ITEMS.map((item: any) =>
                    axios.post('http://localhost:5002/api/enrollments/', {
                        ENROLLMENT_ID: generateEnrollmentId(),
                        COURSE_ID: item.COURSE_ID,
                        USER_ID: cart.USER_ID,
                        PROGRESS: 0,
                        STATUS: 1,
                        WATCHED: []
                    })
                )
            );

            res.send(`
              <html>
                <body>
                  <script>
                    window.close();
                  </script>
                  <p>Payment processed, you can close this tab.</p>
                </body>
              </html>
            `);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error checking payment status", error });
        }
    }
}

export default PaymentController; 