"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{error || "An unknown error occurred. Please try again."}</p>
      <a href="/auth/login">Go back to Login</a>
    </div>
  );
}
