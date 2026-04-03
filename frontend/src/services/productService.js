import api from "@/lib/axios";

// ✅ Get all products
export const getProducts = () => {
  return api.get("/products");
};

// ✅ Get product by ID
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

// ✅ Create product
export const createProduct = (data) => {
  return api.post("/products", data);
};

// ✅ Update product
export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};

// ✅ Delete product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};