"use server";

import { cookies } from "next/headers";
import axiosInstance from "../api/axios";

interface UpdateProfileData {
  name: string;
  email: string;
}

const mapUserForCookie = (user: any) => ({
  id: user?.id || user?._id || "",
  name: user?.name || user?.username || `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
  email: user?.email || "",
  role: user?.role,
  username: user?.username,
  firstName: user?.firstName,
  lastName: user?.lastName,
});

export const updateProfile = async (formData: UpdateProfileData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const userCookie = cookieStore.get("user")?.value;

    const currentUser = userCookie ? JSON.parse(userCookie) : null;
    const userId = currentUser?.id || currentUser?._id;

    if (!token || !userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await axiosInstance.put(
      `/api/auth/${userId}`,
      {
        username: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update user cookie with new data
    if (res.data.data) {
      cookieStore.set("user", JSON.stringify(mapUserForCookie(res.data.data)), {
        httpOnly: false,
        path: "/",
      });
    }

    return {
      success: true,
      message: res.data.message || "Profile updated successfully",
      data: res.data.data,
    };
  } catch (err: any) {
    console.error("Update profile error:", err);
    
    // Extract error message from axios error
    let errorMessage = "Something went wrong";
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.status === 404) {
      errorMessage = "Profile update endpoint not found. Please ensure /api/user/profile endpoint exists on the backend.";
    } else if (err.response?.status === 500) {
      errorMessage = "Server error. Please check backend logs.";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};
