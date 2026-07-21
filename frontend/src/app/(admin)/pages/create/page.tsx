"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPage } from "@/services/page.service";
import Editor from "@/components/editor/Editor";

export default function CreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    status: "draft",
    content: {
      blocks: [],
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createPage(form);

      alert("Page created successfully!");

      router.push("/pages");
    } catch (error) {
      console.error(error);
      alert("Failed to create page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="mx-auto max-w-2xl p-6">
      
      <h1 className="mb-6 text-3xl font-bold">Create Page</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label>Title</label>

          <input
            className="mt-1 w-full rounded border p-3"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Slug</label>

          <input
            className="mt-1 w-full rounded border p-3"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status</label>

          <select
            className="mt-1 w-full rounded border p-3"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
            <label className="mb-2 block">Content</label>

            <Editor
              data={form.content}
              onChange={(data) =>
                setForm((prev) => ({
                  ...prev,
                  content: data,
                }))
              }
            />
          </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-5 py-3 text-white"
        >
          {loading ? "Saving..." : "Create Page"}
        </button>
      </form>
    </div>
  );
}