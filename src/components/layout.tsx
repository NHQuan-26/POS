import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import "../App.css";
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-row">
      <Sidebar></Sidebar>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
