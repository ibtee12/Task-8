"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiUser, FiImage, FiSave } from "react-icons/fi";
import { useSession, updateUser } from "@/lib/auth-client";

/**
 * Update Information form (Challenge #1).
 * Two fields — Name and Image (photo URL) — plus an "Update Information"
 * button. Follows BetterAuth's updateUser flow:
 * https://better-auth.com/docs/concepts/users-accounts#update-user
 */
export default function UpdateForm() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [form, setForm] = useState({ name: "", image: "" });
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Seed the form once the session loads.
  if (!touched && session?.user && form.name === "" && form.image === "") {
    setForm({ name: session.user.name || "", image: session.user.image || "" });
  }

  const handleChange = (e) => {
    setTouched(true);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateUser({
      name: form.name,
      image: form.image || undefined,
    });

    if (error) {
      toast.error(error.message || "Could not update your information.");
      setLoading(false);
      return;
    }

    toast.success("Your information has been updated.");
    // Back to the profile; hard nav so the new data is reflected everywhere.
    window.location.assign("/profile");
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const preview = form.image;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Live avatar preview */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-base-100 bg-base-200 shadow">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Avatar preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-2xl font-bold text-base-content/40">
              {(form.name || "?").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="text-xs text-base-content/50">Avatar preview</span>
      </div>

      {/* Name */}
      <label className="form-control w-full">
        <span className="mb-1.5 block text-sm font-medium">Name</span>
        <div className="relative">
          <FiUser className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="input input-bordered w-full pl-10"
          />
        </div>
      </label>

      {/* Image */}
      <label className="form-control w-full">
        <span className="mb-1.5 block text-sm font-medium">Image URL</span>
        <div className="relative">
          <FiImage className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="input input-bordered w-full pl-10"
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full gap-2"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <FiSave className="h-4 w-4" />
        )}
        Update Information
      </button>
    </form>
  );
}
