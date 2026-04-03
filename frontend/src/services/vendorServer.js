import api from "@/lib/axios";

// ✅ Get vendors
export const getVendors = () => {
  return api.get("/vendors");
};

// ✅ Create vendor
export const createVendor = (data) => {
  return api.post("/vendors", data);
};