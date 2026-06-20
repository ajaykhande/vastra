import axios from "../api/axiosInstance";

export const getAddress = async () => {
  const response = await axios.get("/address");
  return response.data;
};

export const addAddress = async (newAddress) => {
  const response = await axios.post("/address", newAddress);
  return response.data;
};

export const updateAddress = async (newAddress, addressId) => {
  const response = await axios.put(`/address/${addressId}`, newAddress);
  return response.data;
};
