import axios from "axios";

// API instance for authentication-related endpoints
const APIAuth = axios.create({
  baseURL: "http://localhost:5008/api/auth", // Backend base URL for authentication
});

// API instance for other unauthenticated or general endpoints
const API = axios.create({
  baseURL: "http://localhost:5008/api/users", // Backend base URL for general APIs
});

// Add token to headers for authenticated requests
API.interceptors.request.use((req) => {
  // const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Make sure to prefix with "Bearer"
  }
  return req;
});

// API calls
export const register = (data) => APIAuth.post("/register", data);
export const login = (data) => APIAuth.post("/login", data);
export const createNewUser = (data) => API.post("/createuser", data); // Pass `data` parameter
export const getUser = () => API.get("/user");
