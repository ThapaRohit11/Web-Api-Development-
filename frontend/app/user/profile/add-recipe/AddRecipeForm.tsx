"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRecipeForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setImage(null);
      setPreviewUrl("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please upload a valid image file." });
      setImage(null);
      setPreviewUrl("");
      return;
    }

    setMessage(null);
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage({ type: "error", text: "Recipe title is required." });
      return;
    }

    if (!description.trim()) {
      setMessage({ type: "error", text: "Recipe description is required." });
      return;
    }

    if (!image) {
      setMessage({ type: "error", text: "Recipe image is required." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const payload = new FormData();
    payload.append("title", title);
    payload.append("description", description);
    payload.append("image", image);

    const response = await fetch("/api/recipes", {
      method: "POST",
      body: payload,
    });

    const result = await response.json();

    setIsSubmitting(false);

    if (!response.ok || !result.success) {
      setMessage({ type: "error", text: result.message });
      return;
    }

    setMessage({ type: "success", text: result.message });
    setTitle("");
    setDescription("");
    setImage(null);
    setPreviewUrl("");

    router.push("/recipes");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-300">
          Recipe Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter recipe title"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-300">
          Recipe Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter recipe description"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-300">
          Recipe Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
          className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
        />
      </div>

      {previewUrl && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-300">Image Preview</p>
          <img src={previewUrl} alt="Recipe preview" className="h-56 w-full rounded-lg object-cover" />
        </div>
      )}

      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === "success" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-800"
      >
        {isSubmitting ? "Uploading..." : "Upload Recipe"}
      </button>
    </form>
  );
}
