"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/login", label: "Sign In" },
  { href: "/signup", label: "Sign Up" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[.08] dark:border-white/[.145] bg-background/70 backdrop-blur">
      <nav className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-7 w-7 rounded-md overflow-hidden border border-black/[.08] dark:border-white/[.145] bg-background">
              <Image src="/globe.svg" alt="Logo" fill className="object-contain p-1" />
            </div>
            <span className="font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-pink-500 to-emerald-500 bg-clip-text text-transparent">
              Gaming Nexus
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-black/[.04] dark:hover:bg-white/[.06] ${
                    active ? "text-foreground" : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {label}
                  {active ? (
                    <span className="absolute inset-x-2 -bottom-[2px] h-[2px] bg-gradient-to-r from-indigo-500 via-pink-500 to-emerald-500 rounded-full" />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      {/* subtle animated bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-pink-500 to-emerald-500 opacity-60" />
    </header>
  );
}


