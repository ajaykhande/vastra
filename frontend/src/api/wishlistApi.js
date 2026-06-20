import axios from "./axiosInstance";

export const getWishlist = async () => {
  const response = await axios.get("/wishlist");
  return response.data;
};

export const addToWishlist = async (productId) => {
  const response = await axios.post(`/wishlist/${productId}`);
  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await axios.delete(`/wishlist/${productId}`);
  return response.data;
};
