import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "../../../(auth)/components/Header";
import { getMyRecipes } from "@/lib/actions/recipe-actions";
import MyRecipeActions from "./MyRecipeActions";
import FavoriteButton from "@/components/FavoriteButton";

export const dynamic = "force-dynamic";

function excerpt(text: string, max = 120) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}...`;
}

function formatCreatedAt(createdAt: string) {
  const parsedDate = new Date(createdAt);
  return Number.isNaN(parsedDate.getTime()) ? createdAt : parsedDate.toLocaleString();
}

export default async function MyRecipePage() {
  const recipes = await getMyRecipes();

  return (
    <ProtectedRoute>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-yellow-400 mix-blend-screen blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-orange-400 mix-blend-screen blur-3xl" />
        </div>

        <section className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <Link
              href="/user/profile"
              className="inline-flex items-center rounded-md border border-gray-600 bg-slate-900/70 px-4 py-2 text-sm font-medium text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              ← Back to Profile
            </Link>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">My Recipes</p>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Recipes Added By You</h1>

          {recipes.length === 0 ? (
            <div className="rounded-xl border border-gray-700 bg-slate-900/70 p-8 text-center text-gray-300">
              You have not added any recipe yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="overflow-hidden rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800"
                >
                  <div className="flex items-center gap-3 border-b border-gray-700 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">
                      {recipe.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{recipe.authorName}</p>
                      <p className="text-xs text-gray-400">{recipe.authorEmail || `@${recipe.authorUsername}`}</p>
                    </div>
                  </div>

                  <img src={recipe.imageUrl} alt={recipe.title} className="h-48 w-full object-cover" />

                  <div className="p-5">
                    <h2 className="mb-2 text-xl font-semibold text-white">{recipe.title}</h2>
                    <p className="mb-4 text-sm text-gray-300">{excerpt(recipe.description)}</p>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-400">{formatCreatedAt(recipe.createdAt)}</span>
                      <div className="flex gap-2">
                        <Link
                          href={`/recipes/${recipe.id}?from=my-recipe`}
                          className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-600"
                        >
                          Read More
                        </Link>
                        <FavoriteButton recipeId={recipe.id} />
                      </div>
                    </div>

                    <MyRecipeActions recipeId={recipe.id} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}
