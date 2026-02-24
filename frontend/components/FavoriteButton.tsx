"use client";

import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, checkIfFavorited } from "@/lib/actions/favorite-actions";

interface FavoriteButtonProps {
  recipeId: string;
  onFavoriteChange?: (isFavorited: boolean) => void;
}

export default function FavoriteButton({ recipeId, onFavoriteChange }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorited = await checkIfFavorited(recipeId);
      setIsFavorited(favorited);
      setIsLoading(false);
    };

    checkFavorite();
  }, [recipeId]);

  const handleToggleFavorite = async () => {
    setIsUpdating(true);

    const result = isFavorited
      ? await removeFavorite(recipeId)
      : await addFavorite(recipeId);

    if (result.success) {
      setIsFavorited(!isFavorited);
      onFavoriteChange?.(!isFavorited);
    } else {
      // Revert state on error
      setIsFavorited(isFavorited);
    }

    setIsUpdating(false);
  };

  if (isLoading) {
    return (
      <button
        disabled
        className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white opacity-50"
      >
        ♡
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isUpdating}
      className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
        isFavorited
          ? "bg-red-600 text-white hover:bg-red-700"
          : "border border-gray-600 bg-slate-900/70 text-white hover:border-red-400 hover:text-red-400"
      } ${isUpdating ? "opacity-50" : ""}`}
    >
      {isFavorited ? "♥ Favorited" : "♡ Favorite"}
    </button>
  );
}
