"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/lib/actions/admin-actions";

interface DeleteUserButtonProps {
  userId: string;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setMessage(null);

    const result = await deleteUser(userId);

    if (result.success) {
      setMessage({
        type: "success",
        text: "User deleted successfully. Redirecting...",
      });
      setTimeout(() => {
        router.push("/admin/users");
      }, 2000);
    } else {
      setMessage({
        type: "error",
        text: result.message || "Failed to delete user",
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          disabled={isDeleting}
        >
          Delete User
        </button>
      ) : (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 space-y-4">
          <p className="text-red-300 font-semibold">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              disabled={isDeleting}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-300"
              : "bg-red-500/20 border border-red-500/50 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
