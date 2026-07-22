import Footer from "@/components/public/Footer";
import Hero from "@/components/public/Hero";
import Navbar from "@/components/public/Navbar";
import BlockRenderer from "@/components/public/BlockRenderer";

async function getPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pages/slug/standards`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function HomePage() {
  const page = await getPage();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <Hero />

        {page && (
          <section className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-8">
              {page.title}
            </h1>

            <BlockRenderer content={page.content} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}