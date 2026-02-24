"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RecipeItem } from "@/lib/actions/recipe-actions";
import FavoriteButton from "@/components/FavoriteButton";

function excerpt(text: string, max = 120) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}...`;
}

function formatCreatedAt(createdAt: string) {
  const parsedDate = new Date(createdAt);
  return Number.isNaN(parsedDate.getTime()) ? createdAt : parsedDate.toLocaleString();
}

interface RecipesFeedProps {
  recipes: RecipeItem[];
}

export default function RecipesFeed({ recipes }: RecipesFeedProps) {
  const [query, setQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return recipes;

    return recipes.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(normalized) ||
        recipe.description.toLowerCase().includes(normalized) ||
        recipe.authorName.toLowerCase().includes(normalized) ||
        recipe.authorUsername.toLowerCase().includes(normalized)
      );
    });
  }, [query, recipes]);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
        Explore Recipes
      </p>
      <h1 className="mb-4 text-4xl font-bold md:text-5xl">Community Recipe Feed</h1>

      <div className="mb-10 rounded-xl border border-gray-700 bg-slate-900/70 p-4 md:p-5">
        <label htmlFor="recipe-search" className="mb-2 block text-sm text-gray-300">
          Search recipes by title, user, or keyword
        </label>
        <input
          id="recipe-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search recipes..."
          className="h-11 w-full rounded-lg border border-gray-600 bg-slate-800 px-4 text-sm text-white outline-none focus:border-yellow-400"
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="rounded-xl border border-gray-700 bg-slate-900/70 p-8 text-center text-gray-300">
          No recipes found for "{query}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
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

              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="mb-2 text-xl font-semibold text-white">{recipe.title}</h2>
                <p className="mb-4 text-sm text-gray-300">{excerpt(recipe.description)}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-400">{formatCreatedAt(recipe.createdAt)}</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/recipes/${recipe.id}?from=recipes`}
                      className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-600"
                    >
                      Read More
                    </Link>
                    <FavoriteButton recipeId={recipe.id} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
