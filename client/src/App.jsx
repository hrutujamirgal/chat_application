import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Front from "./pages/Front";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <Router><UserProvider>
        <Routes>
          
            <Route path="/" element={<Index />} />
            <Route path="/in" element={<Front />} />
         
        </Routes> </UserProvider>
      </Router>
    </>
  );
}

export default App;
