'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Game {
  id: string;
  title: string;
  imageUrl?: string;
  playerCount: number;
  category: string;
  isTrending: boolean;
}

export function TrendingGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingGames() {
      try {
        const response = await fetch('/api/games?trending=true&limit=4');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error fetching trending games:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingGames();
  }, []);

  const formatPlayerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M online`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}k online`;
    }
    return `${count} online`;
  };

  if (loading) {
    return (
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
      {games.map((game) => (
        <Link 
          key={game.id} 
          href={`/category/${game.category.toLowerCase().replace(' ', '-')}`}
          className="group rounded-lg border border-black/[.08] dark:border-white/[.145] p-3 hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors"
        >
          <div className="aspect-video relative mb-2 overflow-hidden rounded-md">
            {game.imageUrl ? (
              <Image 
                src={game.imageUrl} 
                alt={game.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform" 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{game.title.charAt(0)}</span>
              </div>
            )}
            {game.isTrending && (
              <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                🔥
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm">{game.title}</p>
            <span className="text-[11px] opacity-70">{formatPlayerCount(game.playerCount)}</span>
          </div>
          <div className="text-[10px] opacity-60 mt-1">{game.category}</div>
        </Link>
      ))}
    </div>
  );
}
