"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface UpdateRecipeFormProps {
  recipeId: string;
  initialTitle: string;
  initialDescription: string;
}

export default function UpdateRecipeForm({
  recipeId,
  initialTitle,
  initialDescription,
}: UpdateRecipeFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage({ type: "error", text: "Title and description are required" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
      }),
    });

    const result = await response.json();
    setIsLoading(false);

    if (!response.ok || !result.success) {
      setMessage({ type: "error", text: result.message || "Failed to update recipe" });
      return;
    }

    router.push("/user/profile/my-recipe");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-300">
          Recipe Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter recipe title"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-300">
          Recipe Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter recipe description"
          rows={6}
          required
        />
      </div>

      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === "success" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-800"
        >
          {isLoading ? "Updating..." : "Update Recipe"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/user/profile/my-recipe")}
          className="rounded-lg border border-slate-600 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
