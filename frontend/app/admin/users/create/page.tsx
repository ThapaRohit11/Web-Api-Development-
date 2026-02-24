import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import CreateUserForm from "./CreateUserForm";

export const dynamic = 'force-dynamic';

export default async function CreateUserPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <Navigation isAdmin={true} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">Create New User</h1>
              <Link
                href="/admin/users"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Back to Users
              </Link>
            </div>

            <CreateUserForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
