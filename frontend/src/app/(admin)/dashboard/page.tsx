"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

interface Page {
  _id: string;
  title: string;
  status: string;
}

interface Media {
  _id: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [pages, setPages] = useState<Page[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [pagesRes, mediaRes] = await Promise.all([
          api.get("/pages"),
          api.get("/media"),
        ]);

        setPages(pagesRes.data);
        setMedia(mediaRes.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="p-8 text-lg font-medium">
        Loading Dashboard...
      </div>
    );
  }

  const published = pages.filter(
    (page) => page.status === "published"
  ).length;

  const drafts = pages.filter(
    (page) => page.status === "draft"
  ).length;

  const cards = [
    {
      title: "Total Pages",
      value: pages.length,
      icon: "📄",
    },
    {
      title: "Published",
      value: published,
      icon: "✅",
    },
    {
      title: "Draft Pages",
      value: drafts,
      icon: "📝",
    },
    {
      title: "Media Files",
      value: media.length,
      icon: "🖼️",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">CMS Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Welcome back, Admin 👋
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">
              {card.icon}
            </div>

            <p className="text-gray-500">
              {card.title}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/pages"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            ➕ Manage Pages
          </Link>

          <Link
            href="/media"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            📤 Upload Media
          </Link>
        </div>
      </div>

      {/* Recent Pages */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-5">
          Recent Pages
        </h2>

        <div className="overflow-x-auto rounded-xl bg-white shadow-md border">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {pages.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center p-6 text-gray-500"
                  >
                    No pages available.
                  </td>
                </tr>
              ) : (
                pages.slice(0, 5).map((page) => (
                  <tr
                    key={page._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">
                      {page.title}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          page.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}