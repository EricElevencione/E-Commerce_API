import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

export default function MainLayout() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="content">
        <Outlet /> {/* Child pages render here dynamically */}
      </main>
    </div>
  );
}
