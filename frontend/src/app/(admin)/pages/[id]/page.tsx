"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPageById, updatePage } from "@/services/page.service";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    status: "draft",
    content: {
      blocks: [],
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const page = await getPageById(id as string);

        setForm({
          title: page.title,
          slug: page.slug,
          status: page.status,
          content: page.content,
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load page.");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id]);

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
      setSaving(true);

      await updatePage(id as string, form);

      alert("Page updated successfully!");

      router.push("/pages");
    } catch (error) {
      console.error(error);
      alert("Failed to update page.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Page</h1>

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

        <button
          type="submit"
          disabled={saving}
          className="rounded bg-blue-600 px-5 py-3 text-white"
        >
          {saving ? "Updating..." : "Update Page"}
        </button>
      </form>
    </div>
  );
}