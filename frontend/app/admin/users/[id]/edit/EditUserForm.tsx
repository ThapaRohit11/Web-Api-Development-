"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/lib/actions/admin-actions";

interface EditUserFormProps {
  userId: string;
}

interface UserData {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  image?: string;
}

export default function EditUserForm({ userId }: EditUserFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    role: "user",
    password: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
  }>({});

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const result = await getUserById(userId);
      
      if (result.success && result.data) {
        const user = result.data as UserData;
        setFormData({
          email: user.email || "",
          username: user.username || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          role: user.role || "user",
          password: "",
        });

        // Set current image if exists
        if (user.image) {
          // Assuming backend returns image path like "/uploads/filename.jpg"
          const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
          setCurrentImage(`${baseURL}${user.image}`);
        }
      } else {
        setMessage({
          type: "error",
          text: `Failed to load user: ${result.message}. Backend endpoint GET /api/admin/users/${userId} returned 500 error. Please implement this endpoint on your backend.`,
        });
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear field-specific error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setMessage({
          type: "error",
          text: "Please select a valid image file (.jpg, .jpeg, .png, .gif, .webp)",
        });
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; username?: string } = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Username validation
    if (!formData.username || formData.username.trim() === "") {
      newErrors.username = "Username is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare update data
    const updateData: {
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      role: string;
      password?: string;
      image?: File;
    } = {
      email: formData.email,
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
    };

    // Only include password if it's not empty
    if (formData.password && formData.password.trim() !== "") {
      updateData.password = formData.password;
    }

    // Only include image if a new file was selected
    if (imageFile) {
      updateData.image = imageFile;
    }

    const result = await updateUser(userId, updateData);

    setIsSubmitting(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      setTimeout(() => {
        router.push("/admin/users");
      }, 1500);
    }
  };

  const handleCancel = () => {
    router.push("/admin/users");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-700/50 p-6 rounded-lg">
          <p className="text-gray-300">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-slate-700 border ${
            errors.email ? "border-red-500" : "border-slate-600"
          } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="user@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Username <span className="text-red-400">*</span>
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-slate-700 border ${
            errors.username ? "border-red-500" : "border-slate-600"
          } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-400">{errors.username}</p>
        )}
      </div>

      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter first name (optional)"
        />
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter last name (optional)"
        />
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Role <span className="text-red-400">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Profile Image */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Profile Image
        </label>
        
        {/* Current Image */}
        {currentImage && !imagePreview && (
          <div className="mb-3">
            <p className="text-sm text-gray-400 mb-2">Current Image:</p>
            <img
              src={currentImage}
              alt="Current profile"
              className="w-24 h-24 object-cover rounded-lg border-2 border-slate-600"
            />
          </div>
        )}

        {/* New Image Preview */}
        {imagePreview && (
          <div className="mb-3">
            <p className="text-sm text-green-400 mb-2">New Image Preview:</p>
            <img
              src={imagePreview}
              alt="New preview"
              className="w-24 h-24 object-cover rounded-lg border-2 border-green-500"
            />
          </div>
        )}

        <input
          id="image"
          name="image"
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp,image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleImageChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-400">
          Accepted formats: .jpg, .jpeg, .png, .gif, .webp
        </p>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Leave blank to keep current password"
        />
        <p className="mt-1 text-xs text-gray-400">
          Only enter a password if you want to change it
        </p>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/20 text-green-300 border border-green-500/50"
              : "bg-red-500/20 text-red-300 border border-red-500/50"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isSubmitting ? "Updating..." : "Update User"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="flex-1 py-3 px-4 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
