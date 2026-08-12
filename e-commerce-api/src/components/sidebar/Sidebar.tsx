import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faBox,
  faShoppingCart,
  faUsers,
  faChartLine,
  faGear,
  faStore,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

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

  return (
    <aside className="sidebar">
      {/* Brand Logo Header */}
      <div className="sidebar-header">
        <div className="brand-icon">
          <FontAwesomeIcon icon={faStore} />
        </div>
        <div className="brand-info">
          <span className="brand-name">ApexCommerce</span>
          <span className="brand-badge">Admin API</span>
        </div>
      </div>

      {/* Main Navigation List */}
      <div className="sidebar-content">
        <div>
          <div className="nav-group-label">Menu</div>
          <ul className="nav-list">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <span className="nav-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="nav-group-label">System</div>
          <ul className="nav-list">
            {secondaryNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <span className="nav-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">EA</div>
          <div className="user-details">
            <span className="user-name">Eric Elevencione</span>
            <span className="user-role">Administrator</span>
          </div>
          <button className="logout-btn" title="Sign out">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>
    </aside>
  );
}
