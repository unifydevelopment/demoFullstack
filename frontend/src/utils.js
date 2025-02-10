export const saveToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const getToken = () => localStorage.getItem("token");
  
  export const removeToken = () => {
    localStorage.removeItem("token");
  };

  export const isAuthenticated = () => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (!token) return false;

    try {
        const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        const expiry = tokenData.exp * 1000; // Convert to milliseconds
        return expiry > Date.now(); // Check if token is still valid
    } catch (error) {
        return false;
    }
};
  