const PAYMENT_API_BASE = 'http://localhost:5009';

export async function createDirectPayment(payload: {
    courseId: string;
    userId: string;
    price: number;
    courseTitle: string;
}) {
    const res = await fetch(`${PAYMENT_API_BASE}/api/payment/create-qr-direct-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error('Failed to create payment');
    }
    return res.json();
}

export async function createCartPayment(payload: { CartID: string; totalPrice: number }) {
    const res = await fetch(`${PAYMENT_API_BASE}/api/payment/create-qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error('Failed to create payment');
    }
    return res.json();
}