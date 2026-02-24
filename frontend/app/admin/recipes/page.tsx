import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getAllRecipes } from "@/lib/actions/recipe-actions";

export const dynamic = "force-dynamic";

function excerpt(text: string, max = 120) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}...`;
}

function formatCreatedAt(createdAt: string) {
  const parsedDate = new Date(createdAt);
  return Number.isNaN(parsedDate.getTime())
    ? createdAt
    : parsedDate.toLocaleString();
}

export default async function AdminRecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <ProtectedRoute requireAdmin={true}>
      <Navigation isAdmin={true} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">All Recipes</h1>
              <Link
                href="/admin/users"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Back
              </Link>
            </div>

            {recipes.length === 0 ? (
              <div className="bg-slate-700/50 p-8 rounded-lg text-center text-gray-300">
                No recipes found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="pb-4 text-gray-300 font-semibold">Title</th>
                      <th className="pb-4 text-gray-300 font-semibold">Author</th>
                      <th className="pb-4 text-gray-300 font-semibold">Email</th>
                      <th className="pb-4 text-gray-300 font-semibold">Description</th>
                      <th className="pb-4 text-gray-300 font-semibold">Created At</th>
                      <th className="pb-4 text-gray-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipes.map((recipe) => (
                      <tr
                        key={recipe.id}
                        className="border-b border-slate-700/50 hover:bg-slate-700/30"
                      >
                        <td className="py-4 text-white">{recipe.title}</td>
                        <td className="py-4 text-gray-300">
                          {recipe.authorName}
                        </td>
                        <td className="py-4 text-gray-300">
                          {recipe.authorEmail || "N/A"}
                        </td>
                        <td className="py-4 text-gray-300 max-w-sm truncate">
                          {excerpt(recipe.description, 80)}
                        </td>
                        <td className="py-4 text-gray-300 text-sm">
                          {formatCreatedAt(recipe.createdAt)}
                        </td>
                        <td className="py-4">
                          <Link
                            href={`/recipes/${recipe.id}?from=admin`}
                            className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
