import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faBox,
  faShoppingCart,
  faUsers,
  faChartLine,
  faGear,
  faRightFromBracket,
  faShop,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const mainNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: faChartPie },
    { path: "/products", label: "Products", icon: faBox, badge: "12" },
    { path: "/orders", label: "Orders", icon: faShoppingCart, badge: "New" },
    { path: "/customers", label: "Customers", icon: faUsers },
    { path: "/analytics", label: "Analytics", icon: faChartLine },
  ];

  const secondaryNavItems = [
    { path: "/settings", label: "Settings", icon: faGear },
  ];

  const baseClass =
    "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[0.70rem] font-medium transition-all duration-200 relative group";
  const activeClass =
    "text-indigo-700 bg-gradient-to-r from-indigo-50 to-indigo-50/30 font-semibold before:content-[''] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:bg-indigo-500 before:rounded-r before:shadow-[0_0_10px_rgba(99,102,241,0.35)]";
  const inactiveClass =
    "text-slate-500 hover:text-slate-900 hover:bg-slate-100";

  return (
    <aside className="w-[260px] h-screen sticky top-0 bg-white text-slate-800 flex flex-col border-r border-slate-200 select-none z-[100] transition-all duration-300 font-sans">
      {/* Brand Logo Header */}
      <div className="py-6 px-5 flex items-center gap-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[1.1rem] shadow-[0_4px_14px_rgba(99,102,241,0.4)]">
          <FontAwesomeIcon icon={faShop} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[1.05rem] tracking-[-0.3px] text-slate-900 leading-tight">
            E-Commerce
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.8px] text-indigo-500 mt-0.5">
            Admin API
          </span>
        </div>
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 py-5 px-3 overflow-y-auto flex flex-col gap-6">
        <div>
          <div className="text-[0.72rem] font-bold uppercase tracking-[1.1px] text-slate-500 px-3 mb-2">
            Menu
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${baseClass} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`w-[18px] text-[1.05rem] flex justify-center items-center transition-transform duration-200 group-hover:translate-x-0.5 ${isActive ? "text-indigo-500" : "text-inherit"}`}
                      >
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[0.72rem] font-bold uppercase tracking-[1.1px] text-slate-500 px-3 mb-2">
            System
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            {secondaryNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${baseClass} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`w-[18px] text-[1.05rem] flex justify-center items-center transition-transform duration-200 group-hover:translate-x-0.5 ${isActive ? "text-indigo-500" : "text-inherit"}`}
                      >
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="w-[80%] mx-auto p-4 border-t border-slate-100">
        <button
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-slate-500 hover:text-red-600 hover:bg-red-500/10 transition-all duration-200 rounded-lg font-semibold text-[0.75rem] cursor-pointer"
          title="Sign out"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
