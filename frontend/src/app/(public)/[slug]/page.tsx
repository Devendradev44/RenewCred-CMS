"use client";

import { use, useEffect, useState } from "react";
import { getPageBySlug } from "@/services/page.service";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default function PublicPage({ params }: Props) {
  const { slug } = use(params);

  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      try {
        const data = await getPageBySlug(slug);
        setPage(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [slug]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!page) {
    return <div className="p-10">Page not found.</div>;
  }

  return (
    <main className="mx-auto max-w-4xl p-10">
      <h1 className="mb-6 text-4xl font-bold">{page.title}</h1>

      <pre className="rounded bg-gray-100 p-4 overflow-auto">
        {JSON.stringify(page.content, null, 2)}
      </pre>
    </main>
  );
}