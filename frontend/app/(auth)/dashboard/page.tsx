import ProtectedRoute from "@/components/ProtectedRoute";
import { getUser, isAdmin } from "@/lib/auth-utils";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getUser();
  const admin = await isAdmin();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-300 mb-8">
              You are logged in as{" "}
              <span className="font-semibold text-blue-400">
                {user?.role || "user"}
              </span>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/user/profile"
                className="block p-6 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <h2 className="text-xl font-semibold text-white mb-2">
                  My Profile
                </h2>
                <p className="text-gray-300">
                  View and update your profile information
                </p>
              </Link>

              {admin && (
                <Link
                  href="/admin/users"
                  className="block p-6 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 rounded-lg transition-colors"
                >
                  <h2 className="text-xl font-semibold text-white mb-2">
                    User Management
                  </h2>
                  <p className="text-gray-300">
                    Manage users and create new accounts
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
