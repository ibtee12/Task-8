"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { signIn } from "@/lib/auth-client";
import GoogleButton from "@/components/auth/GoogleButton";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // When the browser restores this page from the back/forward cache (bfcache)
  // after a successful login + redirect, the frozen "Logging in…" state would
  // otherwise stay stuck. Reset the button on page-show; if the user is already
  // logged in, bounce them away from the login page.
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        setLoading(false);
        // If a session cookie exists, they're already logged in — leave login.
        if (document.cookie.includes("better-auth")) {
          window.location.replace(redirectTo);
        }
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [redirectTo]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await signIn.email({
      email: form.email,
      password: form.password,
    });

    if (signInError) {
      const message = signInError.message || "Invalid email or password.";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success("Welcome back! You're logged in.");
    // Hard navigation so the navbar (and any server components) pick up the
    // freshly-created session immediately.
    window.location.assign(redirectTo);
  };

  return (
    <div>
      <header className="mb-8 text-center lg:text-left">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-base-content/60">
          Log in to borrow your next read.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Inline error banner (in addition to toast) */}
        {error && (
          <div role="alert" className="alert alert-error py-2 text-sm">
            <span>{error}</span>
          </div>
        )}

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

        {/* Password */}
        <label className="form-control w-full">
          <span className="mb-1.5 block text-sm font-medium">Password</span>
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
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

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg group w-full gap-2 rounded-xl shadow-md transition-shadow hover:shadow-lg"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Logging in…
              </>
            ) : (
              <>
                Login
                <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="divider my-6 text-xs text-base-content/40">OR</div>

      <GoogleButton label="Continue with Google" />

      <p className="mt-8 text-center text-sm text-base-content/70">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
