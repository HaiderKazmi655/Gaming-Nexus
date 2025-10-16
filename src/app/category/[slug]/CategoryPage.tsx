'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface Game {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  playerCount: number;
  rating?: number | null;
  isTrending: boolean;
  platform?: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  games: Game[];
}

interface CategoryInfo {
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface CategoryPageProps {
  category: Category;
  categoryInfo: CategoryInfo;
}

export function CategoryPage({ category, categoryInfo }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<'trending' | 'players' | 'rating'>('trending');

  const formatPlayerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M players`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}k players`;
    }
    return `${count} players`;
  };

  const formatRating = (rating?: number | null) => {
    if (!rating) return 'N/A';
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const sortedGames = [...category.games].sort((a, b) => {
    switch (sortBy) {
      case 'players':
        return b.playerCount - a.playerCount;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'trending':
      default:
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return b.playerCount - a.playerCount;
    }
  });

  return (
    <div className="min-h-screen bg-animated-gradient p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-4"
          >
            ← Back to Home
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: categoryInfo.color + '20', borderColor: categoryInfo.color + '40' }}
            >
              {categoryInfo.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{categoryInfo.name}</h1>
              <p className="text-lg opacity-70">{categoryInfo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="opacity-70">{category.games.length} games</span>
            <span className="opacity-70">•</span>
            <span className="opacity-70">
              {category.games.reduce((sum, game) => sum + game.playerCount, 0).toLocaleString()} total players
            </span>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('trending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'trending'
                  ? 'bg-foreground text-background'
                  : 'bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12]'
              }`}
            >
              🔥 Trending
            </button>
            <button
              onClick={() => setSortBy('players')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'players'
                  ? 'bg-foreground text-background'
                  : 'bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12]'
              }`}
            >
              👥 Most Players
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'rating'
                  ? 'bg-foreground text-background'
                  : 'bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12]'
              }`}
            >
              ⭐ Top Rated
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedGames.map((game) => (
            <div 
              key={game.id} 
              className="group rounded-xl border border-black/[.08] dark:border-white/[.145] p-4 hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors"
            >
              <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                {game.imageUrl ? (
                  <Image 
                    src={game.imageUrl} 
                    alt={game.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform" 
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: categoryInfo.color + '20' }}
                  >
                    <span className="text-2xl font-bold" style={{ color: categoryInfo.color }}>
                      {game.title.charAt(0)}
                    </span>
                  </div>
                )}
                {game.isTrending && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    🔥 Trending
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{game.title}</h3>
                {game.description && (
                  <p className="text-sm opacity-70 line-clamp-2">{game.description}</p>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">{formatPlayerCount(game.playerCount)}</span>
                  <span className="opacity-70">{formatRating(game.rating)}</span>
                </div>
                
                {game.platform && (
                  <div className="text-xs opacity-60">{game.platform}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {category.games.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{categoryInfo.icon}</div>
            <h3 className="text-xl font-bold mb-2">No games found</h3>
            <p className="opacity-70">Check back later for new games in this category!</p>
          </div>
        )}
      </div>
    </div>
  );
}
