import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<div>Products Page</div>} />
          <Route path="/orders" element={<div>Orders Page</div>} />
          <Route path="/customers" element={<div>Customers Page</div>} />
          <Route path="/analytics" element={<div>Analytics Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
