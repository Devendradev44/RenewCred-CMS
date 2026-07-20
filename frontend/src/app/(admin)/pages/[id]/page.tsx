"use client";

import { useParams } from "next/navigation";

export default function EditPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Page</h1>

      <p className="mt-4">Page ID: {id}</p>
    </div>
  );
}