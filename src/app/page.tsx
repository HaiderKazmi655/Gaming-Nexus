import Link from "next/link";
import Image from "next/image";
import { TrendingGames } from "@/app/components/TrendingGames";
import { CategoriesSection } from "@/app/components/CategoriesSection";

export default function Home() {
  const ticker = [
    "Nova won a 1v5 clutch in Valorant!",
    "ShadowX reached Diamond in Apex.",
    "LunaCraft speedran Ender Dragon in 14m!",
    "Rogue hit a 360° no-scope.",
    "Team Hydra secured tournament finals.",
  ];

  return (
    <div className="font-sans bg-animated-gradient min-h-[80vh] rounded-xl p-6 md:p-10">
      <section className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-12">
        <div className="flex-1 min-w-[360px] space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full border border-black/[.08] dark:border-white/[.145]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live players right now
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Discover. Squad up. <span className="text-fuchsia-500">Dominate.</span>
          </h1>
          <p className="text-sm md:text-base opacity-80 max-w-[60ch]">
            The game community hub: follow creators, build your squad, join events, and share highlight reels.
          </p>
          <div className="flex flex-row flex-wrap gap-3">
            <Link href="/feed" className="glow inline-flex items-center justify-center px-5 py-3 rounded-lg bg-foreground text-background text-sm font-semibold">
              Explore Feed
            </Link>
            <Link href="/signup" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-foreground text-background text-sm font-semibold min-w-[112px]">
              Sign Up
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors text-sm font-semibold min-w-[112px]">
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex-1 min-w-[520px] w-full">
          <div className="relative rounded-xl border border-black/[.08] dark:border-white/[.145] p-4 sm:p-6 overflow-hidden glow">
            <div className="marquee">
              <div className="marquee__track">
                {[...ticker, ...ticker].map((t, i) => (
                  <span key={i} className="text-xs md:text-sm opacity-80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <TrendingGames />
          </div>
        </div>
      </section>

      <CategoriesSection />

      <section className="mt-10 md:mt-14">
        <div className="rounded-xl p-6 border border-black/[.08] dark:border-white/[.145] flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold">Host a weekend tournament</h3>
            <p className="text-sm opacity-80">Create brackets, invite squads, stream finals, and track leaderboards.</p>
          </div>
          <Link href="/login" className="glow inline-flex items-center justify-center px-5 py-3 rounded-lg bg-foreground text-background text-sm font-semibold">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
