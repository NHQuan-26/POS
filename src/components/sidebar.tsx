import "../App.css";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/hamburger.svg";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-black text-white p-4">
      <div className="flex justify-start gap-5 items-center border-b border-b-gray-500 pb-3 mb-3">
        <img src={Logo} alt="" className="w-6 h-6 filter invert" />
        <h1 className="text-2xl font-bold">POS App</h1>
      </div>
      <nav className="space-y-2">
        <SidebarLink to="/dashboard" currentPath={currentPath}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/sale" currentPath={currentPath}>
          Sales
        </SidebarLink>
        <SidebarLink to="/order" currentPath={currentPath}>
          Order
        </SidebarLink>
      </nav>
    </aside>
  );
}

function SidebarLink({
  to,
  currentPath,
  children,
}: {
  to: string;
  currentPath: string;
  children: string;
}) {
  const isActive = currentPath.startsWith(to);

  return (
    <div
      className={`transition-all rounded group py-2 ${
        isActive ? "pl-2 shadow-md" : "hover:pl-2 hover:shadow-md"
      }`}
    >
      <Link
        to={to}
        className={`block transition-all duration-500 ${
          isActive
            ? "text-white font-bold "
            : "text-gray-400 group-hover:text-white group-hover:font-semibold"
        }`}
      >
        {children}
      </Link>
    </div>
  );
}
