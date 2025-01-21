import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesFile from "./routes/RoutesFile"; // Import your Routes file
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <RoutesFile /> {/* Use RoutesFile for routing */}
    </BrowserRouter>
  );
};

export default App;
