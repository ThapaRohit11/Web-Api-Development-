import Header from "../(auth)/components/Header";
import RecipesFeed from "./RecipesFeed";
import { isAuthenticated } from "../../lib/auth-utils";
import { redirect } from "next/navigation";
import { getAllRecipes } from "@/lib/actions/recipe-actions";

export default async function RecipesPage() {
  const authenticated = await isAuthenticated();
  const recipes = await getAllRecipes();

  if (!authenticated) {
    redirect("/login");
  }

  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-yellow-400 mix-blend-screen blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-orange-400 mix-blend-screen blur-3xl" />
        </div>

        <RecipesFeed recipes={recipes} />
      </main>
    </>
  );
}
