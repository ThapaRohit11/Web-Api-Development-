"use server";

import { cookies } from "next/headers";
import { loginUser, registerUser } from "../api/auth";

const mapUserForCookie = (user: any) => ({
  id: user?.id || user?._id || "",
  name: user?.name || user?.username || `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
  email: user?.email || "",
  role: user?.role,
  username: user?.username,
  firstName: user?.firstName,
  lastName: user?.lastName,
});

// Register
export const handleRegister = async (formData: { username: string; email: string; password: string; confirmPassword: string }) => {
  try {
    const res = await registerUser(formData);
    return {
      success: true,
      message: res.message,
      data: res.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

// Login
export const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    const res = await loginUser(formData);

    // Get cookies object first (await it)
    const cookieStore = await cookies();

    cookieStore.set("token", res.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    cookieStore.set("user", JSON.stringify(mapUserForCookie(res.data)), {
      httpOnly: false,
      path: "/",
    });

    return {
      success: true,
      message: res.message,
      data: res.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};