"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { RecipeItem } from "./recipe-actions";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const normalizeRecipe = (recipe: RecipeItem): RecipeItem => {
  const imageUrl = recipe.imageUrl?.startsWith("http")
    ? recipe.imageUrl
    : `${apiBaseUrl}${recipe.imageUrl}`;

  return {
    ...recipe,
    imageUrl,
  };
};

export const addFavorite = async (recipeId: string) => {
  try {
    if (!apiBaseUrl) {
      return {
        success: false,
        message: "API base URL is not configured",
      };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const response = await axios.post(
      `${apiBaseUrl}/api/favorites/${recipeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add favorite",
    };
  }
};

export const removeFavorite = async (recipeId: string) => {
  try {
    if (!apiBaseUrl) {
      return {
        success: false,
        message: "API base URL is not configured",
      };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const response = await axios.delete(
      `${apiBaseUrl}/api/favorites/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to remove favorite",
    };
  }
};

export const checkIfFavorited = async (recipeId: string): Promise<boolean> => {
  try {
    if (!apiBaseUrl) {
      return false;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return false;
    }

    const response = await axios.get(
      `${apiBaseUrl}/api/favorites/${recipeId}/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data?.isFavorited || false;
  } catch (error) {
    return false;
  }
};

export const getFavorites = async () => {
  try {
    if (!apiBaseUrl) {
      return {
        success: false,
        recipes: [],
        message: "API base URL is not configured",
      };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        recipes: [],
        message: "Unauthorized",
      };
    }

    const response = await axios.get(`${apiBaseUrl}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const recipes = response.data.data?.map((recipe: RecipeItem) =>
      normalizeRecipe(recipe)
    ) || [];

    return {
      success: response.data.success,
      recipes,
    };
  } catch (error: any) {
    return {
      success: false,
      recipes: [],
      message: error.response?.data?.message || "Failed to fetch favorites",
    };
  }
};
