'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategoryInfo } from '@/lib/game-categorizer';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  _count: {
    games: number;
  };
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="mt-10 md:mt-14">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Trending Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 md:mt-14">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Trending Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((category) => {
          const categoryInfo = getCategoryInfo(category.name);
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group glow rounded-md border border-black/[.08] dark:border-white/[.145] px-3 py-2 text-xs font-semibold hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors relative overflow-hidden"
              style={{ borderColor: categoryInfo.color + '20' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{categoryInfo.icon}</span>
                <span>{category.name}</span>
              </div>
              <div className="text-[10px] opacity-60 mt-1">
                {category._count.games} games
              </div>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: categoryInfo.color }}
              ></div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
