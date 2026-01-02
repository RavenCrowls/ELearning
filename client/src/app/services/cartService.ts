const CART_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const CART_API = `${CART_API_BASE}/api/carts`;

export async function fetchCart(userId: string) {
  const res = await fetch(`${CART_API}/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function removeCartItem(userId: string, courseId: number) {
  const res = await fetch(`${CART_API}/user/${userId}/item/${courseId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove item from cart");
}

export async function clearCartApi(userId: string) {
  const res = await fetch(`${CART_API}/user/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to clear cart");
}

export async function getUserCarts(userId: string) {
  const res = await fetch(`${CART_API}/user/${userId}`);
  if (!res.ok) return null;
  return res.json();
}

export async function updateCart(cartId: string, payload: any) {
  const res = await fetch(`${CART_API}/${cartId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update cart");
  return res.json?.();
}

export async function createCart(payload: any) {
  const res = await fetch(`${CART_API}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create cart");
  return res.json?.();
}
