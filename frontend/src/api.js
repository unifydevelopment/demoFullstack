import axios from "axios";

// API instance for authentication-related endpoints
const APIAuth = axios.create({
  baseURL: "http://localhost:5008/api/auth", // Backend base URL for authentication
});

// API instance for other authenticated or general endpoints
const API = axios.create({
  baseURL: "http://localhost:5008/api/users", // Backend base URL for general APIs
});

// Add token to headers for authenticated requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Fetch token from localStorage here
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Prefix the token with "Bearer"
  }
  return req;
});

// API calls
export const register = (data) => APIAuth.post("/register", data);
export const login = (data) => APIAuth.post("/login", data);
export const getAllUsers = () => API.get("/");
export const createNewUser = (data) => API.post("/createuser", data);
export const getUserData = (id) => API.get(`/edit/${id}`);
export const editUserData = (id,data) => API.put(`/edit/${id}`, data);
export const deleteUser = (id) => API.delete(`/delete/${id}`);
