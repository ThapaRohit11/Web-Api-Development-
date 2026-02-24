"use server";

import { cookies } from "next/headers";
import axiosInstance from "../api/axios";
import { API } from "../api/endpoints";

interface CreateUserData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
}

interface UpdateUserData {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  password?: string;
  image?: File;
}

export const createUser = async (formData: CreateUserData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // Use register endpoint to create user
    // Note: If you have a dedicated /api/auth/user endpoint with multer support,
    // you can switch to FormData as mentioned in the requirements
    const res = await axiosInstance.post(
      API.AUTH.REGISTER,
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role || "user",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      message: res.data.message || "User created successfully",
      data: res.data.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const getUserById = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const res = await axiosInstance.get(
      API.ADMIN.USER_BY_ID(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      message: "User fetched successfully",
      data: res.data.data || res.data,
    };
  } catch (err: any) {
    console.error("Get user by ID error:", err);
    
    let errorMessage = "Failed to fetch user";
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.status === 400) {
      errorMessage = `Invalid user ID format: "${id}". This appears to be a dummy user. Please ensure GET /api/admin/users endpoint is working to load real users with valid MongoDB ObjectIds.`;
    } else if (err.response?.status === 404) {
      errorMessage = `User with ID ${id} not found`;
    } else if (err.response?.status === 500) {
      errorMessage = "Server error. Please check backend: GET /api/admin/users/:id endpoint";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

export const updateUser = async (id: string, formData: UpdateUserData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // Create FormData for image upload support
    const form = new FormData();
    
    if (formData.email) form.append("email", formData.email);
    if (formData.username) form.append("username", formData.username);
    if (formData.firstName) form.append("firstName", formData.firstName);
    if (formData.lastName) form.append("lastName", formData.lastName);
    if (formData.role) form.append("role", formData.role);
    if (formData.password) form.append("password", formData.password);
    if (formData.image) form.append("image", formData.image);

    const res = await axiosInstance.put(
      API.ADMIN.USER_BY_ID(id),
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      success: true,
      message: res.data.message || "User updated successfully",
      data: res.data.data,
    };
  } catch (err: any) {
    console.error("Update user error:", err);
    
    let errorMessage = "Failed to update user";
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.status === 404) {
      errorMessage = "User not found or endpoint doesn't exist";
    } else if (err.response?.status === 500) {
      errorMessage = "Server error. Please check backend: PUT /api/admin/users/:id endpoint";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const deleteUser = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await axiosInstance.delete(
      API.ADMIN.USER_BY_ID(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      message: res.data.message || "User deleted successfully",
    };
  } catch (err: any) {
    console.error("Delete user error:", err);
    
    let errorMessage = "Failed to delete user";
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.status === 404) {
      errorMessage = "User not found";
    } else if (err.response?.status === 500) {
      errorMessage = "Server error. Please check backend: DELETE /api/admin/users/:id endpoint";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Unauthorized",
        data: [],
      };
    }

    const res = await axiosInstance.get(
      API.ADMIN.USERS,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      message: "Users fetched successfully",
      data: res.data.data || res.data || [],
    };
  } catch (err: any) {
    console.error("Get all users error:", err);
    
    let errorMessage = "Failed to fetch users";
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.status === 500) {
      errorMessage = "Server error. Using dummy data. Please implement GET /api/admin/users endpoint";
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return {
      success: false,
      message: errorMessage,
      data: [],
    };
  }
};
export const getTotalUsers = async () => {
  try {
    const result = await getAllUsers();
    return result.data?.length || 0;
  } catch (error) {
    return 0;
  }
};

export const getTotalRecipes = async () => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      return 0;
    }

    const response = await fetch(`${apiBaseUrl}/api/recipes`, {
      method: "GET",
    });

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.data?.length || 0;
  } catch (error) {
    return 0;
  }
};

export const getDashboardStats = async () => {
  try {
    const totalUsers = await getTotalUsers();
    const totalRecipes = await getTotalRecipes();

    return {
      success: true,
      stats: {
        totalUsers,
        totalRecipes,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch dashboard stats",
      stats: {
        totalUsers: 0,
        totalRecipes: 0,
      },
    };
  }
};