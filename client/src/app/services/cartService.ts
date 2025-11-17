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