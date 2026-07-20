"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPages, Page } from "@/services/page.service";

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await getPages();
        setPages(data);
      } catch (error) {
        console.error("Failed to fetch pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pages</h1>

        <Link
          href="/pages/create"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Create Page
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : pages.length === 0 ? (
        <p>No pages found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Updated</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pages.map((page) => (
              <tr key={page._id}>
                <td className="border p-2">{page.title}</td>
                <td className="border p-2">{page.slug}</td>
                <td className="border p-2">{page.status}</td>
                <td className="border p-2">
                  {new Date(page.updatedAt).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <Link
                    href={`/pages/${page._id}`}
                    className="mr-4 text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => console.log(page._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}