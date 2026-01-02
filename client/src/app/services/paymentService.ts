const PAYMENT_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const PAYMENT_API = `${PAYMENT_API_BASE}/api/payment`;

export async function createDirectPayment(payload: {
  courseId: string;
  userId: string;
  price: number;
  courseTitle: string;
}) {
  const res = await fetch(`${PAYMENT_API}/create-qr-direct-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create payment");
  }
  return res.json();
}

export async function createCartPayment(payload: {
  CartID: string;
  totalPrice: number;
}) {
  const res = await fetch(`${PAYMENT_API}/create-qr`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create payment");
  }
  return res.json();
}
