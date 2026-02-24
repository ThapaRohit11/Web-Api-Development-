import Link from "next/link";
import { notFound } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "../../../../../(auth)/components/Header";
import { getMyRecipes } from "@/lib/actions/recipe-actions";
import UpdateRecipeForm from "./UpdateRecipeForm";

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = await params;
  const myRecipes = await getMyRecipes();
  const recipe = myRecipes.find((item) => item.id === id);

  if (!recipe) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Link
              href="/user/profile/my-recipe"
              className="inline-flex items-center rounded-md border border-slate-600 bg-slate-800/70 px-4 py-2 text-sm font-medium text-white transition hover:border-blue-400"
            >
              ← Back to My Recipe
            </Link>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Update Recipe</h1>

            <UpdateRecipeForm
              recipeId={recipe.id}
              initialTitle={recipe.title}
              initialDescription={recipe.description}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
