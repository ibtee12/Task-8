"use client";

import { Toaster } from "react-hot-toast";

/**
 * App-wide toast host. Styled to match the Inkwell theme tokens so toasts
 * read as part of the design rather than a generic overlay.
 */
export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "var(--color-base-100)",
          color: "var(--color-base-content)",
          border: "1px solid var(--color-base-300)",
          borderRadius: "0.75rem",
          fontSize: "0.9rem",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        },
        success: {
          iconTheme: {
            primary: "var(--color-primary)",
            secondary: "var(--color-primary-content)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--color-error)",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
