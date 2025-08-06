
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProjectList from "./pages/ProjectList";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Corrected import
import IssueBoard from "./pages/IssueBoard.jsx";
import IssueDetail from "./pages/IssueDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
      <Route path="/projects/:projectId" element={<ProtectedRoute><IssueBoard /></ProtectedRoute>} />
      <Route path="/issues/:issueId" element={<ProtectedRoute><IssueDetail /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;

