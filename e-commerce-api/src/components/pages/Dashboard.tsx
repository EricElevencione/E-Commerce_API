import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faShoppingBag,
  faUsers,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,290.00",
      change: "+14.5%",
      icon: faDollarSign,
      color: "#6366f1",
    },
    {
      title: "Total Orders",
      value: "1,482",
      change: "+8.2%",
      icon: faShoppingBag,
      color: "#a855f7",
    },
    {
      title: "Active Customers",
      value: "8,921",
      change: "+12.1%",
      icon: faUsers,
      color: "#38bdf8",
    },
    {
      title: "Growth Rate",
      value: "24.8%",
      change: "+4.3%",
      icon: faArrowUpRightDots,
      color: "#22c55e",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1
          style={{ fontSize: "1.75rem", margin: "0 0 6px 0", color: "#f8fafc" }}
        >
          Dashboard Overview
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
          Welcome back, Eric. Here is what is happening with your store today.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: "#0f172a",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                {stat.title}
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "#22c55e",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  marginTop: "6px",
                }}
              >
                {stat.change} vs last month
              </div>
            </div>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: `${stat.color}15`,
                color: stat.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
              }}
            >
              <FontAwesomeIcon icon={stat.icon} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
