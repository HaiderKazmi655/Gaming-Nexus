import { PrismaClient } from '@prisma/client';
import { categorizeGame } from './game-categorizer';

const prisma = new PrismaClient();

const initialGames = [
  {
    title: 'Valorant',
    description: 'A 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.',
    imageUrl: '/valorant.jpeg',
    genre: 'Tactical FPS',
    platform: 'PC',
    playerCount: 15000000,
    rating: 4.2
  },
  {
    title: 'Apex Legends',
    description: 'A free-to-play battle royale game featuring unique characters with special abilities.',
    imageUrl: '/apexlegends.jpg',
    genre: 'Battle Royale FPS',
    platform: 'PC, Console',
    playerCount: 100000000,
    rating: 4.5
  },
  {
    title: 'Fortnite',
    description: 'A battle royale game where 100 players fight to be the last one standing.',
    imageUrl: '/fortnite.jpeg',
    genre: 'Battle Royale',
    platform: 'PC, Console, Mobile',
    playerCount: 350000000,
    rating: 4.0
  },
  {
    title: 'Minecraft',
    description: 'A sandbox game where players can build, explore, and survive in blocky worlds.',
    imageUrl: '/Minecraft.jpeg',
    genre: 'Sandbox, Survival',
    platform: 'PC, Console, Mobile',
    playerCount: 300000000,
    rating: 4.8
  },
  {
    title: 'League of Legends',
    description: 'A multiplayer online battle arena game where two teams of five champions battle.',
    genre: 'MOBA',
    platform: 'PC',
    playerCount: 180000000,
    rating: 4.3
  },
  {
    title: 'World of Warcraft',
    description: 'A massively multiplayer online role-playing game set in the Warcraft universe.',
    genre: 'MMORPG',
    platform: 'PC',
    playerCount: 5000000,
    rating: 4.1
  },
  {
    title: 'Counter-Strike 2',
    description: 'The world\'s premier competitive FPS, built on the Source 2 engine.',
    genre: 'Tactical FPS',
    platform: 'PC',
    playerCount: 25000000,
    rating: 4.4
  },
  {
    title: 'Among Us',
    description: 'A multiplayer party game of teamwork and betrayal set in space.',
    genre: 'Social Deduction',
    platform: 'PC, Mobile',
    playerCount: 100000000,
    rating: 4.0
  },
  {
    title: 'Genshin Impact',
    description: 'An open-world action RPG with gacha mechanics and elemental combat.',
    genre: 'Action RPG',
    platform: 'PC, Console, Mobile',
    playerCount: 60000000,
    rating: 4.2
  },
  {
    title: 'Rocket League',
    description: 'Soccer meets driving in this physics-based multiplayer game.',
    genre: 'Sports, Racing',
    platform: 'PC, Console',
    playerCount: 100000000,
    rating: 4.3
  }
];

const categories = [
  { name: 'FPS', slug: 'fps', description: 'First-Person Shooters', icon: '🎯', color: '#ef4444' },
  { name: 'Battle Royale', slug: 'battle-royale', description: 'Battle Royale Games', icon: '🏆', color: '#f97316' },
  { name: 'MMO', slug: 'mmo', description: 'Massively Multiplayer Online', icon: '🌐', color: '#3b82f6' },
  { name: 'Sandbox', slug: 'sandbox', description: 'Sandbox & Creative Games', icon: '🧱', color: '#10b981' },
  { name: 'MOBA', slug: 'moba', description: 'Multiplayer Online Battle Arena', icon: '⚔️', color: '#8b5cf6' },
  { name: 'Indie', slug: 'indie', description: 'Indie Games', icon: '🎨', color: '#ec4899' }
];

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');

    // Create categories
    console.log('📁 Creating categories...');
    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: category,
        create: category
      });
    }

    // Create games
    console.log('🎮 Creating games...');
    for (const gameData of initialGames) {
      const categorizedGame = categorizeGame(gameData);
      
      // Find the category
      const category = await prisma.category.findFirst({
        where: { name: categorizedGame.category }
      });

      await prisma.game.upsert({
        where: { title: gameData.title },
        update: {
          ...categorizedGame,
          categoryId: category?.id,
          releaseDate: new Date('2020-01-01') // Default release date
        },
        create: {
          ...categorizedGame,
          categoryId: category?.id,
          releaseDate: new Date('2020-01-01') // Default release date
        }
      });
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase();
}
