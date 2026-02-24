import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getUserById } from "@/lib/actions/admin-actions";
import DeleteUserButton from "./DeleteUserButton";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getUserById(id);
  const user = result.data;

  return (
    <ProtectedRoute requireAdmin={true}>
      <Navigation isAdmin={true} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">User Details</h1>
              <Link
                href="/admin/users"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Back to Users
              </Link>
            </div>

            {!result.success ? (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-red-300">
                <p className="font-semibold">Error loading user</p>
                <p className="text-sm mt-1">{result.message}</p>
              </div>
            ) : user ? (
              <div className="space-y-6">
                <div className="bg-slate-700/50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    User Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        ID
                      </label>
                      <p className="text-white font-mono text-sm">{id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Username
                      </label>
                      <p className="text-white">{user.username || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <p className="text-white">{user.email || 'N/A'}</p>
                    </div>
                    {user.firstName && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          First Name
                        </label>
                        <p className="text-white">{user.firstName}</p>
                      </div>
                    )}
                    {user.lastName && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Last Name
                        </label>
                        <p className="text-white">{user.lastName}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Role
                      </label>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {user.role || 'user'}
                      </span>
                    </div>
                    {user.image && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Profile Image
                        </label>
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}${user.image}`}
                          alt="Profile"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-slate-600"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <DeleteUserButton userId={id} />
                </div>
              </div>
            ) : (
              <div className="bg-slate-700/50 p-6 rounded-lg">
                <p className="text-gray-300">User not found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
