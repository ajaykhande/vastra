import axios from "../api/axiosInstance";

export const register = async (name, email, password) => {
  const response = await axios.post("/users/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post("/users/login", { email, password });

  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get("/users/profile");
  return response.data;
};

export const updateProfile = async (name, email) => {
  const response = await axios.put("users/update-profile", { name, email });
  return response.data;
};

export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword,
) => {
  const response = await axios.put("users/change-password", {
    oldPassword,
    newPassword,
    confirmPassword,
  });
  return response.data;
};
