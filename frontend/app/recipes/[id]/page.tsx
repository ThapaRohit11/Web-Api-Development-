import { notFound } from "next/navigation";
import Header from "../../(auth)/components/Header";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { isAuthenticated } from "../../../lib/auth-utils";
import { redirect } from "next/navigation";
import { getRecipeById } from "@/lib/actions/recipe-actions";
import FavoriteButton from "@/components/FavoriteButton";

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}

export default async function RecipeDetailPage({ params, searchParams }: RecipeDetailPageProps) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login");
  }

  const { id } = await params;
  const { from } = await searchParams;
  const recipe = await getRecipeById(id);

  const createdAtLabel = (() => {
    if (!recipe) return "";
    const parsedDate = new Date(recipe.createdAt);
    return Number.isNaN(parsedDate.getTime()) ? recipe.createdAt : parsedDate.toLocaleString();
  })();

  if (!recipe) {
    notFound();
  }

  return (
    <>
      {from === "admin" ? <Navigation isAdmin={true} /> : <Header />}

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-yellow-400 mix-blend-screen blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-orange-400 mix-blend-screen blur-3xl" />
        </div>

        <article className="relative mx-auto max-w-4xl px-6 py-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href={
                from === "my-recipe"
                  ? "/user/profile/my-recipe"
                  : from === "favorites"
                  ? "/user/profile/favorites"
                  : from === "admin"
                  ? "/admin/recipes"
                  : "/recipes"
              }
              className="inline-flex items-center rounded-md border border-gray-600 bg-slate-900/70 px-4 py-2 text-sm font-medium text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              ← Back {from === "my-recipe" ? "to My Recipes" : from === "favorites" ? "to Favorites" : from === "admin" ? "to Recipes" : "to Recipes"}
            </Link>
            {from !== "admin" && <FavoriteButton recipeId={id} />}
          </div>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-black">
              {recipe.authorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold">{recipe.authorName}</p>
              <p className="text-sm text-gray-400">{recipe.authorEmail || `@${recipe.authorUsername}`} · {createdAtLabel}</p>
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{recipe.title}</h1>

          <div className="grid items-start gap-6 md:grid-cols-[1fr_320px]">
            <div className="rounded-xl border border-gray-700 bg-slate-900/70 p-6">
              <h2 className="mb-3 text-xl font-semibold">Description</h2>
              <p className="leading-8 text-gray-300">{recipe.description}</p>
            </div>

            <div className="self-start rounded-xl border border-gray-700 bg-slate-900/70 p-4">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="h-auto max-h-80 w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
