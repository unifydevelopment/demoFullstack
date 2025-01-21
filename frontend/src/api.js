import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/users", // Backend base URL
});

// Add token to headers for authenticated requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const getUser = () => API.get("/user");
