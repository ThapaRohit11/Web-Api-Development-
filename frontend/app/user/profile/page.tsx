import ProtectedRoute from "@/components/ProtectedRoute";
import { getUser } from "@/lib/auth-utils";
import Header from "../../(auth)/components/Header";
import ProfileForm from "./ProfileForm";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <ProtectedRoute>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-8">User Profile</h1>
            {user && <ProfileForm user={user} />}
          </div>

          <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Add Recipe</h2>
            <p className="text-gray-300 mb-6">Create a new recipe with title and image upload.</p>
            <Link
              href="/user/profile/add-recipe"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Open Add Recipe
            </Link>
          </div>

          <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-3">My Recipe</h2>
            <p className="text-gray-300 mb-6">View all recipes added by you.</p>
            <Link
              href="/user/profile/my-recipe"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Open My Recipe
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
