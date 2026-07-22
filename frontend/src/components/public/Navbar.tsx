import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          RenewCred
        </Link>

        <nav className="flex gap-8 text-sm">
          <Link href="#">Buyers</Link>
          <Link href="#">Suppliers</Link>
          <Link href="#">Create & Use</Link>
          <Link href="#">Science</Link>
          <Link
            href="/standards"
            className="text-red-500"
          >
            Standards
          </Link>
          <Link href="#">Contact</Link>
        </nav>

        <button className="rounded border px-4 py-2 text-sm">
          Registry
        </button>
      </div>
    </header>
  );
}