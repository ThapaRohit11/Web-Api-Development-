"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ConfirmLogoutButton from "./ConfirmLogoutButton";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-slate-700"
      }`}
    >
      {children}
    </Link>
  );
}

interface NavigationProps {
  isAdmin?: boolean;
}

export default function Navigation({ isAdmin = false }: NavigationProps) {
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/home"
              className="text-xl font-bold text-white"
            >
              Recipe Finder
            </Link>
            {!isAdmin && <NavLink href="/user/profile">Profile</NavLink>}
            {isAdmin && (
              <>
                <NavLink href="/admin/dashboard">Dashboard</NavLink>
                <NavLink href="/admin/recipes">Recipes</NavLink>
                <NavLink href="/admin/users">User Management</NavLink>
              </>
            )}
          </div>
          <div>
            <ConfirmLogoutButton className="px-4 py-2 text-gray-300 hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
}
