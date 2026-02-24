"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

interface MyRecipeActionsProps {
  recipeId: string;
}

export default function MyRecipeActions({ recipeId }: MyRecipeActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onDelete = async () => {
    setShowConfirm(false);

    setIsLoading(true);
    setMessage(null);

    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: "DELETE",
    });

    const result = await response.json();
    setIsLoading(false);

    if (!response.ok || !result.success) {
      setMessage({ type: "error", text: result.message || "Failed to delete recipe" });
      return;
    }

    router.refresh();
  };

  return (
    <div className="mt-4 border-t border-gray-700 pt-4">
      <div className="flex gap-2">
        <Link
          href={`/user/profile/my-recipe/${recipeId}/edit`}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Update
        </Link>
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={isLoading}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Delete Recipe"
        message="Are you sure you want to delete this recipe? This action cannot be undone."
        confirmText="Delete"
        loading={isLoading}
        onConfirm={onDelete}
        onCancel={() => setShowConfirm(false)}
      />

      {message && (
        <p className={`mt-3 text-xs ${message.type === "success" ? "text-green-300" : "text-red-300"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
