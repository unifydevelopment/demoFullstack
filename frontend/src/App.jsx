import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesFile from "./routes/RoutesFile"; // Import your Routes file
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    
    <BrowserRouter>
     <ToastContainer autoClose={1500} />
      <RoutesFile /> {/* Use RoutesFile for routing */}
    </BrowserRouter>
  );
};

export default App;
