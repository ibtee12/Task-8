"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

/**
 * "Continue with Google" button shared by the login and register pages.
 * Kicks off the BetterAuth Google OAuth flow and, on success, returns the
 * user to the home page (callbackURL).
 */
export default function GoogleButton({ label = "Continue with Google" }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      // On success the browser is redirected by BetterAuth; no further code runs.
    } catch (err) {
      toast.error(
        err?.message || "Google sign-in is unavailable. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      disabled={loading}
      className="btn btn-outline w-full gap-2 border-base-300 hover:border-base-content/30 hover:bg-base-200"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      {label}
    </button>
  );
}
