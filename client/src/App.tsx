import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Classroom from "./pages/Classroom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classroom/:classId" element={<Classroom />} />
      </Routes>
    </Router>
  );
}

export default App;
