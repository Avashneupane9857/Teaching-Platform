import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Classroom from "./pages/Classroom";
import Signup from "./pages/Signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classroom/:classId" element={<Classroom />} />
      </Routes>
    </Router>
  );
}

export default App;
