import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faShoppingBag,
  faUsers,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";

// Reusable layout components to capsule the CSS design classes
function DashboardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-semibold text-[#C7D3C0] tracking-tight mb-1 ">
      {children}
    </h1>
  );
}

function DashboardSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-500">{children}</p>;
}

export default function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,290.00",
      change: "+14.5%",
      icon: faDollarSign,
      color: "#6366f1",
      bgLight: "rgba(99, 102, 241, 0.1)",
    },
    {
      title: "Total Orders",
      value: "1,482",
      change: "+8.2%",
      icon: faShoppingBag,
      color: "#a855f7",
      bgLight: "rgba(168, 85, 247, 0.1)",
    },
    {
      title: "Active Customers",
      value: "8,921",
      change: "+12.1%",
      icon: faUsers,
      color: "#38bdf8",
      bgLight: "rgba(56, 189, 248, 0.1)",
    },
    {
      title: "Growth Rate",
      value: "24.8%",
      change: "+4.3%",
      icon: faArrowUpRightDots,
      color: "#22c55e",
      bgLight: "rgba(34, 197, 94, 0.1)",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome & Header Section */}
      <div>
        <DashboardTitle>Dashboard Overview</DashboardTitle>
        <DashboardSubtitle>
          Welcome back, Eric. Here is what is happening with your store today.
        </DashboardSubtitle>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60 shadow-sm shadow-slate-200/40"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </span>
              <span className="text-2xl font-bold text-slate-900 leading-tight">
                {stat.value}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-bold text-emerald-600">
                  {stat.change}
                </span>
                <span className="text-xs text-slate-400">vs last month</span>
              </div>
            </div>

            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl shadow-inner"
              style={{ backgroundColor: stat.bgLight, color: stat.color }}
            >
              <FontAwesomeIcon icon={stat.icon} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
