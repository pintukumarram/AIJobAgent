"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, User, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8 text-indigo-600">JobAgent</h1>

      <nav className="flex flex-col space-y-3">
        {links.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center space-x-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 p-2 rounded-lg transition-all duration-200 ${
              pathname === href ? "bg-indigo-100 text-indigo-600" : ""
            }`}
          >
            <Icon size={18} />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
