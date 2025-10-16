import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { CategoryPage } from './CategoryPage';
import { getCategoryInfo } from '@/lib/game-categorizer';

const prisma = new PrismaClient();

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true }
  });
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug }
  });

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const categoryInfo = getCategoryInfo(category.name);

  return {
    title: `${categoryInfo.name} Games`,
    description: categoryInfo.description,
  };
}

export default async function CategoryPageRoute({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      games: {
        orderBy: [
          { isTrending: 'desc' },
          { playerCount: 'desc' }
        ]
      }
    }
  });

  if (!category) {
    notFound();
  }

  const categoryInfo = getCategoryInfo(category.name);

  return (
    <CategoryPage 
      category={category} 
      categoryInfo={categoryInfo}
    />
  );
}
