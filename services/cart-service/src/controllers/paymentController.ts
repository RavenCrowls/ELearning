import { Request, Response } from "express";
import {
  HashAlgorithm,
  VNPay,
  ignoreLogger,
  ProductCode,
  VnpLocale,
  dateFormat,
} from "vnpay";
import axios from "axios";
import { generateEnrollmentId } from "../utils/idGenerator";

class PaymentController {
  async createQRPayment(req: Request, res: Response) {
    try {
      const tmnCode = process.env.VNPAY_TMN_CODE;
      const secureSecret = process.env.VNPAY_SECRET;

      if (!tmnCode || !secureSecret) {
        return res.status(500).json({
          error:
            "VNPAY_TMN_CODE or VNPAY_SECRET is not set in environment variables.",
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

      const { CartID, totalPrice } = req.body;

      const vnpayResponse = await vnpay.buildPaymentUrl({
        vnp_Amount: totalPrice,
        vnp_IpAddr: "127.0.0.1",
        vnp_TxnRef: CartID,
        vnp_OrderInfo: `Payment for cart ${CartID}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: `http://localhost:5008/api/payments/check-payment-vnpay?cartID=${CartID}`,
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
      const { cartID, vnp_ResponseCode, vnp_TransactionStatus } = req.query;
      if (!cartID) {
        return res.status(400).json({ message: "Missing cartID" });
      }

      if (vnp_ResponseCode !== "00" || vnp_TransactionStatus !== "00") {
        return res.send(`
                  <html>
                    <body>
                      <p>Thanh toán thất bại hoặc bị hủy. Bạn chưa được ghi danh vào các khóa học trong giỏ hàng.</p>
                      <script>window.close();</script>
                    </body>
                  </html>
                `);
      }

      const cartRes = await axios.get(
        `http://localhost:5008/api/carts/${cartID}`
      );
      const cart = cartRes.data;

      await axios.put(`http://localhost:5008/api/carts/${cartID}`, {
        PAYMENT_STATUS: "paid",
      });

      await Promise.all(
        cart.ITEMS.map((item: any) =>
          axios.post("http://localhost:5003/api/enrollments/", {
            ENROLLMENT_ID: generateEnrollmentId(),
            COURSE_ID: item.COURSE_ID,
            USER_ID: cart.USER_ID,
            PROGRESS: 0,
            STATUS: 1,
            WATCHED: [],
          })
        )
      );

      // Update ENROLLMENT_COUNT for each course in the cart
      await Promise.all(
        cart.ITEMS.map(async (item: any) => {
          try {
            // Get current course data to get current enrollment count
            const courseRes = await axios.get(
              `http://localhost:5003/api/courses/${item.COURSE_ID}`
            );
            const currentEnrollmentCount = courseRes.data.ENROLLMENT_COUNT || 0;

            // Increment enrollment count
            await axios.put(
              `http://localhost:5003/api/courses/${item.COURSE_ID}`,
              {
                ENROLLMENT_COUNT: currentEnrollmentCount + 1,
              }
            );
          } catch (error) {
            console.error(
              `Failed to update enrollment count for course ${item.COURSE_ID}:`,
              error
            );
          }
        })
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

  async createQRDirectPayment(req: Request, res: Response) {
    try {
      const tmnCode = process.env.VNPAY_TMN_CODE;
      const secureSecret = process.env.VNPAY_SECRET;

      if (!tmnCode || !secureSecret) {
        return res.status(500).json({
          error:
            "VNPAY_TMN_CODE or VNPAY_SECRET is not set in environment variables.",
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

      const { courseId, userId, price, courseTitle } = req.body;
      const transactionRef = `DIRECT_${courseId}_${userId}_${Date.now()}`;

      const vnpayResponse = await vnpay.buildPaymentUrl({
        vnp_Amount: price,
        vnp_IpAddr: "127.0.0.1",
        vnp_TxnRef: transactionRef,
        vnp_OrderInfo: `Direct payment for course: ${courseTitle || courseId}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: `http://localhost:5008/api/payments/check-direct-payment-status?courseId=${courseId}&userId=${userId}&transactionRef=${transactionRef}`,
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(tomorrow),
      });

      return res.status(201).json({ paymentUrl: vnpayResponse });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating direct QR payment", error });
    }
  }

  async checkDirectPaymentStatus(req: Request, res: Response) {
    try {
      const { courseId, userId, vnp_ResponseCode, vnp_TransactionStatus } =
        req.query;
      if (!courseId || !userId) {
        return res.status(400).json({ message: "Missing courseId or userId" });
      }

      if (vnp_ResponseCode !== "00" || vnp_TransactionStatus !== "00") {
        return res.send(`
                  <html>
                    <body>
                      <p>Thanh toán thất bại hoặc bị hủy. Bạn chưa được ghi danh vào khóa học.</p>
                      <script>window.close();</script>
                    </body>
                  </html>
                `);
      }

      await axios.post("http://localhost:5003/api/enrollments/", {
        ENROLLMENT_ID: generateEnrollmentId(),
        COURSE_ID: courseId,
        USER_ID: userId,
        PROGRESS: 0,
        STATUS: 1,
        WATCHED: [],
      });

      // Update ENROLLMENT_COUNT for the course
      try {
        // Get current course data to get current enrollment count
        const courseRes = await axios.get(
          `http://localhost:5003/api/courses/${courseId}`
        );
        const currentEnrollmentCount = courseRes.data.ENROLLMENT_COUNT || 0;

        // Increment enrollment count
        await axios.put(`http://localhost:5003/api/courses/${courseId}`, {
          ENROLLMENT_COUNT: currentEnrollmentCount + 1,
        });
      } catch (error) {
        console.error(
          `Failed to update enrollment count for course ${courseId}:`,
          error
        );
      }

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
      res
        .status(500)
        .json({ message: "Error checking direct payment status", error });
    }
  }
}

export default PaymentController;
