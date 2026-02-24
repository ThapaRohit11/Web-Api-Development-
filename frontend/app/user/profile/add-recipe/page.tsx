import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "../../../(auth)/components/Header";
import Link from "next/link";
import AddRecipeForm from "./AddRecipeForm";

export const dynamic = "force-dynamic";

export default function AddRecipePage() {
  return (
    <ProtectedRoute>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Link
              href="/user/profile"
              className="inline-flex items-center rounded-md border border-slate-600 bg-slate-800/70 px-4 py-2 text-sm font-medium text-white transition hover:border-blue-400"
            >
              ← Back to Profile
            </Link>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Add Recipe</h1>
            <AddRecipeForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
