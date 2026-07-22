"use client";

import { use, useEffect, useState } from "react";
import { getPageBySlug } from "@/services/page.service";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Sidebar from "@/components/public/Sidebar";
import Search from "@/components/public/Search";
import Article from "@/components/public/Article";
import Output from "editorjs-react-renderer";

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
      <>
        <Navbar />

        <main className="max-w-7xl mx-auto px-8 py-10">
          <Search />

          <div className="mt-8 flex gap-10">
            <Sidebar />

            <Article title={page.title}>
              <Output data={page.content} />
            </Article>
          </div>
        </main>

        <Footer />
      </>
    );
}