import axios from "./axiosInstance";

export const placeOrder = async (orderData) => {
  const response = axios.post("/orders", orderData);
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get("/orders");
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axios.put(`/orders/cancel/${orderId}`);
  return response.data;
};
