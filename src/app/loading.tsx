"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-neutral-950">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
