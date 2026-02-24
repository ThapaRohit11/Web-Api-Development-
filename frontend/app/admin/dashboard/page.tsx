import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const result = await getDashboardStats();
  const stats = result.stats;

  return (
    <ProtectedRoute requireAdmin={true}>
      <Navigation isAdmin={true} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Users Card */}
              <Link
                href="/admin/users"
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-100">Total Users</p>
                      <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
                    </div>
                    <div className="text-6xl opacity-20">👥</div>
                  </div>
                  <p className="text-sm text-blue-100 mt-4 group-hover:text-white transition">
                    Click to manage users →
                  </p>
                </div>
              </Link>

              {/* Total Recipes Card */}
              <Link
                href="/admin/recipes"
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-100">Total Recipes</p>
                      <p className="text-4xl font-bold mt-2">{stats.totalRecipes}</p>
                    </div>
                    <div className="text-6xl opacity-20">🍳</div>
                  </div>
                  <p className="text-sm text-yellow-100 mt-4 group-hover:text-white transition">
                    Click to view all recipes →
                  </p>
                </div>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-white mb-6">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/admin/users"
                  className="bg-slate-700/50 hover:bg-slate-700 p-4 rounded-lg text-white transition"
                >
                  <span className="font-semibold">User Management</span>
                  <p className="text-sm text-gray-300">View and manage all users</p>
                </Link>
                <Link
                  href="/admin/recipes"
                  className="bg-slate-700/50 hover:bg-slate-700 p-4 rounded-lg text-white transition"
                >
                  <span className="font-semibold">Recipe Management</span>
                  <p className="text-sm text-gray-300">View all recipes</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
