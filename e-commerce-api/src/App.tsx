import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";

function App() {
  return (
    <Routes>
      {/* 1. Pages inside the Sidebar Admin Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<div>Orders Page</div>} />
        <Route path="/customers" element={<div>Customers Page</div>} />
        <Route path="/analytics" element={<div>Analytics Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Route>

      {/* 2. Pages OUTSIDE the Sidebar (Rendered completely full-screen) */}
      <Route
        path="/login"
        element={<div>Full-Screen Login Page (No Sidebar)</div>}
      />
      <Route path="*" element={<div>404 Page Not Found (No Sidebar)</div>} />
    </Routes>
  );
}

export default App;
