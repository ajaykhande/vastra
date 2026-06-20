import axios from "../api/axiosInstance";

export const getProducts = async () => {
  const response = await axios.get("/product");
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await axios.post("/product", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`/product/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`/product/${id}`);
  return response.data;
};
