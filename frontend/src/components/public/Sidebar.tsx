import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r pr-6">
      <h3 className="mb-4 font-semibold">Documentation</h3>

      <nav className="flex flex-col gap-3">
        <Link href="/about">About</Link>
        <Link href="/University">University</Link>
      </nav>
    </aside>
  );
}