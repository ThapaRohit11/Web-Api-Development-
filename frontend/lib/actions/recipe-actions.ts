"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { API } from "../api/endpoints";

export interface RecipeItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorUsername: string;
  authorEmail?: string;
  createdAt: string;
}

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

export const createRecipe = async (formData: FormData) => {
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

    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const image = formData.get("image") as File | null;

    if (!title || !description || !image) {
      return {
        success: false,
        message: "Title, description and image are required",
      };
    }

    const payload = new FormData();
    payload.append("title", title);
    payload.append("description", description);
    payload.append("image", image);

    const response = await fetch(`${apiBaseUrl}${API.RECIPE.LIST}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: body?.message || "Failed to upload recipe",
      };
    }

    return {
      success: true,
      message: body?.message || "Recipe uploaded successfully",
      data: body?.data as RecipeItem,
    };
  } catch (error: any) {
    const message = error?.message || "Failed to upload recipe";

    return {
      success: false,
      message,
    };
  }
};

export const getAllRecipes = async (): Promise<RecipeItem[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}${API.RECIPE.LIST}`);
    return ((response.data?.data || []) as RecipeItem[]).map(normalizeRecipe);
  } catch (error) {
    return [];
  }
};

export const getRecipeById = async (id: string): Promise<RecipeItem | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}${API.RECIPE.BY_ID(id)}`);
    const recipe = (response.data?.data || null) as RecipeItem | null;
    return recipe ? normalizeRecipe(recipe) : null;
  } catch (error) {
    return null;
  }
};

export const getMyRecipes = async (): Promise<RecipeItem[]> => {
  try {
    if (!apiBaseUrl) {
      return [];
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return [];
    }

    const response = await axios.get(`${apiBaseUrl}${API.RECIPE.MY}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return ((response.data?.data || []) as RecipeItem[]).map(normalizeRecipe);
  } catch (error) {
    return [];
  }
};
