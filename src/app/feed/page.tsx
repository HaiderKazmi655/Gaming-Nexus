"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
type FeedPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string; // ISO string for simplicity
  likes: number;
  hasLiked?: boolean;
};

// Utility to safely revoke previous object URLs
function revokeIfBlob(url?: string) {
  if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
}

export default function FeedPage() {
  const initialPosts = useMemo<FeedPost[]>(
    () => [
      {
        id: "p1",
        title: "Epic clutch in Valorant",
        content:
          "Won a 1v3 on Split with just a Sheriff. Anyone else love eco-round miracles?",
        imageUrl: "/valorant.jpeg",
        author: "@phoenix",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        likes: 12,
        hasLiked: false,
      },
      {
        id: "p2",
        title: "Fortnite new season thoughts",
        content:
          "Map changes are wild. Mobility feels great but loot pool is a bit sweaty.",
        imageUrl: "/fortnite.jpeg",
        author: "@builder",
        createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        likes: 20,
        hasLiked: false,
      },
      {
        id: "p3",
        title: "Apex squad wipe",
        content:
          "Triple take beams from height are still so satisfying. GG to a tough lobby!",
        imageUrl: "/apexlegends.jpg",
        author: "@pathfinder",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        likes: 33,
        hasLiked: false,
      },
      {
        id: "p4",
        title: "Survival base tour",
        content:
          "Finally finished the redstone item sorter. Next up is a villager trading hall.",
        imageUrl: "/Minecraft.jpeg",
        author: "@steve",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        likes: 41,
        hasLiked: false,
      },
    ],
    []
  );

  const [posts, setPosts] = useState<FeedPost[]>(initialPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function timeAgo(iso: string) {
    const diffMs = Date.now() - new Date(iso).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function handleCreatePost() {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) return;

    const newPost: FeedPost = {
      id: `p_${Date.now()}`,
      title: trimmedTitle,
      content: trimmedContent,
      imageUrl: imagePreviewUrl,
      author: "@you",
      createdAt: new Date().toISOString(),
      likes: 0,
      hasLiked: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setTitle("");
    setContent("");
    revokeIfBlob(imagePreviewUrl);
    setImagePreviewUrl(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextLiked = !p.hasLiked;
        return {
          ...p,
          hasLiked: nextLiked,
          likes: p.likes + (nextLiked ? 1 : -1),
        };
      })
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero header */}
      <section className="relative overflow-hidden rounded-xl border bg-background/60 backdrop-blur glow">
        <div className="absolute inset-0 bg-animated-gradient opacity-70" />
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr,420px] gap-0 md:gap-6 items-stretch">
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Community Feed</h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">{posts.length} posts</span>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-prose">
              Share clips, clutch moments, and builds with fellow gamers. Drop a post below and join the conversation.
            </p>
            {/* Activity ticker */}
            <div className="mt-4 rounded-md bg-background/70 border">
              <div className="marquee py-2">
                <div className="marquee__track text-xs md:text-sm text-gray-600 dark:text-gray-300">
                  <span>🔥 New post from @phoenix · </span>
                  <span>🏆 @builder hit a new PB · </span>
                  <span>🎮 Squad formed for Apex · </span>
                  <span>🧠 Tips thread updated · </span>
                  <span>🗺️ Map strat discussion live · </span>
                  {/* duplicate for seamless loop */}
                  <span>🔥 New post from @phoenix · </span>
                  <span>🏆 @builder hit a new PB · </span>
                  <span>🎮 Squad formed for Apex · </span>
                  <span>🧠 Tips thread updated · </span>
                  <span>🗺️ Map strat discussion live · </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative min-h-[180px] md:min-h-[260px]">
            <Image
              src="/COMMUNITY.jpg"
              alt="Community pixel art"
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border rounded p-4 bg-background/60 backdrop-blur glow">
        <h2 className="font-semibold mb-3">Create a post</h2>
        <div className="grid gap-3">
          <input
            className="w-full rounded border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="min-h-24 w-full rounded border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
            placeholder="Share your moment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                // Revoke previous preview if any
                revokeIfBlob(imagePreviewUrl);
                const nextUrl = URL.createObjectURL(file);
                setImagePreviewUrl(nextUrl);
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-md border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.04] dark:hover:bg-white/[.06]"
            >
              Add image
            </button>
            {imagePreviewUrl ? (
              <div className="relative w-16 h-10 rounded overflow-hidden border border-black/[.08] dark:border-white/[.145]">
                <Image src={imagePreviewUrl} alt="preview" fill className="object-cover" unoptimized sizes="64px" />
              </div>
            ) : (
              <span className="text-xs text-gray-500">No image selected</span>
            )}
            <button
              onClick={handleCreatePost}
              className="ml-auto px-3 py-1.5 rounded-md bg-foreground text-background hover:opacity-90"
            >
              Post
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border rounded overflow-hidden bg-background/60 backdrop-blur glow"
          >
            {post.imageUrl ? (
              <div className="relative w-full h-[220px]">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={false}
                  unoptimized
                />
              </div>
            ) : null}

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold leading-tight">{post.title}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {timeAgo(post.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {post.content}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`px-2.5 py-1 rounded-md border text-sm glow ${
                    post.hasLiked
                      ? "bg-foreground text-background"
                      : "border-black/[.08] dark:border-white/[.145] hover:bg-black/[.04] dark:hover:bg-white/[.06]"
                  }`}
                >
                  {post.hasLiked ? "Liked" : "Like"} • {post.likes}
                </button>
                <span className="text-xs text-gray-500">by {post.author}</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

