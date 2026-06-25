"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiBookmark, FiCheck } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

/**
 * "Borrow This Book" action.
 *  - Logged out  → redirect to /login (with a redirect back to this book).
 *  - Logged in   → confirm the borrow with a success toast.
 *  - Out of stock → disabled.
 */
export default function BorrowButton({ bookId, title, available }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [borrowed, setBorrowed] = useState(false);

  const outOfStock = available <= 0;

  const handleBorrow = () => {
    if (!session?.user) {
      toast("Please log in to borrow this book.", { icon: "🔒" });
      router.push(`/login?redirect=/books/${bookId}`);
      return;
    }

    if (outOfStock) {
      toast.error("Sorry, this title is currently unavailable.");
      return;
    }

    setBorrowed(true);
    toast.success(`“${title}” has been borrowed. Enjoy your read!`);
  };

  if (borrowed) {
    return (
      <button
        type="button"
        disabled
        className="btn btn-success btn-lg w-full gap-2 sm:w-auto"
      >
        <FiCheck className="h-5 w-5" />
        Borrowed
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBorrow}
      disabled={outOfStock}
      className="btn btn-primary btn-lg w-full gap-2 sm:w-auto"
    >
      <FiBookmark className="h-5 w-5" />
      {outOfStock ? "Currently Unavailable" : "Borrow This Book"}
    </button>
  );
}
