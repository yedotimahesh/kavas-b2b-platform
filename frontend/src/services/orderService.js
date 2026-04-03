import api from "@/lib/axios";

// ✅ Create order
export const createOrder = (data) => {
  return api.post("/orders", data);
};

// ✅ Get all orders
export const getOrders = () => {
  return api.get("/orders");
};

// ✅ Get single order
export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};