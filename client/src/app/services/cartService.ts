const CART_API_BASE = 'http://localhost:5008';

export async function fetchCart(userId: string) {
    const res = await fetch(`${CART_API_BASE}/api/carts/user/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
}

export async function removeCartItem(userId: string, courseId: number) {
    const res = await fetch(`${CART_API_BASE}/api/carts/user/${userId}/item/${courseId}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to remove item from cart');
}

export async function clearCartApi(userId: string) {
    const res = await fetch(`${CART_API_BASE}/api/carts/user/${userId}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to clear cart');
}

export async function getUserCarts(userId: string) {
    const res = await fetch(`${CART_API_BASE}/api/carts/user/${userId}`);
    if (!res.ok) return null;
    return res.json();
}

export async function updateCart(cartId: string, payload: any) {
    const res = await fetch(`${CART_API_BASE}/api/carts/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update cart');
    return res.json?.();
}

export async function createCart(payload: any) {
    const res = await fetch(`${CART_API_BASE}/api/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create cart');
    return res.json?.();
}