import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Classroom from "./pages/Classroom";
import Signup from "./pages/Signup";
import ClassCreation from "./pages/ClassCreation";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create/class" element={<ClassCreation />} />
        <Route path="/class/:classId/:username" element={<Classroom />} />
      </Routes>
    </Router>
  );
}

export default App;
