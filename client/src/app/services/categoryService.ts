const CATEGORY_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const CATEGORY_API = `${CATEGORY_API_BASE}/api/categories`;

export async function fetchCategoryById(categoryId: string) {
  const res = await fetch(`${CATEGORY_API}/${categoryId}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

export async function fetchAllCategories() {
  const res = await fetch(`${CATEGORY_API}/`);
  if (!res.ok) return [];
  return res.json();
}

export async function updateCategory(categoryId: string, payload: any) {
  const res = await fetch(`${CATEGORY_API}/${categoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function createCategory(payload: any) {
  const res = await fetch(`${CATEGORY_API}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function deleteSubCategory(
  categoryId: string,
  subCategoryId: string
) {
  const res = await fetch(
    `${CATEGORY_API}/${categoryId}/sub-categories/${subCategoryId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) throw new Error("Failed to delete sub-category");
  return true;
}
