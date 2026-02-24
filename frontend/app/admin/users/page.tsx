import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getAllUsers } from "@/lib/actions/admin-actions";

export const dynamic = 'force-dynamic';

// Dummy user data - fallback if API fails
const dummyUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "user" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "user" },
];

export default async function AdminUsersPage() {
  // Fetch real users from backend
  const result = await getAllUsers();
  const users = result.success && result.data.length > 0 ? result.data : dummyUsers;
  const showWarning = !result.success || result.data.length === 0;

  return (
    <ProtectedRoute requireAdmin={true}>
      <Navigation isAdmin={true} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">User Management</h1>
            </div>

            {showWarning && (
              <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-300">
                <p className="font-semibold">⚠️ Using dummy data</p>
                <p className="text-sm mt-1">{result.message}</p>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-4 text-gray-300 font-semibold">ID</th>
                    <th className="pb-4 text-gray-300 font-semibold">Name</th>
                    <th className="pb-4 text-gray-300 font-semibold">Email</th>
                    <th className="pb-4 text-gray-300 font-semibold">Role</th>
                    <th className="pb-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                    <tr
                      key={user.id || user._id}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30"
                    >
                      <td className="py-4 text-gray-300 text-sm truncate max-w-[100px]">
                        {user.id || user._id}
                      </td>
                      <td className="py-4 text-white">
                        {user.name || user.username}
                      </td>
                      <td className="py-4 text-gray-300">{user.email}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/users/${user.id || user._id}`}
                            className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
