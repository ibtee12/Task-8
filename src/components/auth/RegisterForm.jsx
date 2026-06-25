"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiLock,
  FiImage,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { signUp } from "@/lib/auth-client";
import GoogleButton from "@/components/auth/GoogleButton";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lightweight client-side guard for password length (BetterAuth default min is 8).
    if (form.password.length < 8) {
      const msg = "Password must be at least 8 characters.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    setError("");

    const { error: signUpError } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.image || undefined,
    });

    if (signUpError) {
      const message =
        signUpError.message || "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success("Account created! Please log in.");
    // Per the assignment, send the new user to the login page.
    router.push("/login");
  };

  return (
    <div>
      <header className="mb-8 text-center lg:text-left">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Create your account
        </h1>
        <p className="mt-2 text-base-content/60">
          Join Inkwell and start borrowing today.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div role="alert" className="alert alert-error py-2 text-sm">
            <span>{error}</span>
          </div>
        )}

        {/* Name */}
        <label className="form-control w-full">
          <span className="mb-1.5 block text-sm font-medium">Name</span>
          <div className="relative">
            <FiUser className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Reader"
              className="input input-bordered w-full pl-10"
            />
          </div>
        </label>

        {/* Email */}
        <label className="form-control w-full">
          <span className="mb-1.5 block text-sm font-medium">Email</span>
          <div className="relative">
            <FiMail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input input-bordered w-full pl-10"
            />
          </div>
        </label>

        {/* Photo URL */}
        <label className="form-control w-full">
          <span className="mb-1.5 block text-sm font-medium">
            Photo URL{" "}
            <span className="font-normal text-base-content/40">(optional)</span>
          </span>
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

        {/* Password */}
        <label className="form-control w-full">
          <span className="mb-1.5 block text-sm font-medium">Password</span>
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className="input input-bordered w-full px-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          {loading ? "Creating account…" : "Register"}
        </button>
      </form>

      <div className="divider my-6 text-xs text-base-content/40">OR</div>

      <GoogleButton label="Sign up with Google" />

      <p className="mt-8 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
