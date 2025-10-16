// Game categorization logic
export interface GameInfo {
  title: string;
  description?: string;
  imageUrl?: string;
  genre?: string;
  platform?: string;
  releaseDate?: Date;
  playerCount?: number;
  rating?: number;
}

export interface CategorizedGame extends GameInfo {
  category: string;
  isTrending: boolean;
}

// Game categorization rules
const categoryRules = {
  FPS: {
    keywords: ['fps', 'first person', 'shooter', 'gun', 'weapon', 'combat', 'war', 'battlefield', 'call of duty', 'counter-strike', 'valorant', 'apex legends'],
    games: ['Valorant', 'Apex Legends', 'Counter-Strike', 'Call of Duty', 'Battlefield', 'Overwatch', 'Rainbow Six Siege']
  },
  'Battle Royale': {
    keywords: ['battle royale', 'last man standing', 'survival', 'zone', 'circle', 'drop', 'loot', 'fortnite', 'pubg'],
    games: ['Fortnite', 'PUBG', 'Apex Legends', 'Warzone', 'Fall Guys']
  },
  MMO: {
    keywords: ['mmo', 'massively multiplayer', 'online', 'world of warcraft', 'final fantasy', 'guild wars', 'elder scrolls online'],
    games: ['World of Warcraft', 'Final Fantasy XIV', 'Guild Wars 2', 'Elder Scrolls Online', 'Lost Ark']
  },
  Sandbox: {
    keywords: ['sandbox', 'creative', 'build', 'craft', 'minecraft', 'terraria', 'stardew valley', 'simulation', 'open world'],
    games: ['Minecraft', 'Terraria', 'Stardew Valley', 'The Sims', 'Garry\'s Mod', 'Roblox']
  },
  MOBA: {
    keywords: ['moba', 'multiplayer online battle arena', 'league of legends', 'dota', 'heroes', 'champions', 'lanes'],
    games: ['League of Legends', 'Dota 2', 'Heroes of the Storm', 'Smite']
  },
  Indie: {
    keywords: ['indie', 'independent', 'pixel', 'retro', 'art', 'unique', 'experimental'],
    games: ['Hollow Knight', 'Celeste', 'Cuphead', 'Among Us', 'Fall Guys']
  }
};

export function categorizeGame(gameInfo: GameInfo): CategorizedGame {
  const title = gameInfo.title.toLowerCase();
  const description = (gameInfo.description || '').toLowerCase();
  const genre = (gameInfo.genre || '').toLowerCase();
  
  // Check for exact game matches first
  for (const [category, rules] of Object.entries(categoryRules)) {
    if (rules.games.some(game => title.includes(game.toLowerCase()))) {
      return {
        ...gameInfo,
        category,
        isTrending: determineIfTrending(gameInfo)
      };
    }
  }
  
  // Check for keyword matches
  const allText = `${title} ${description} ${genre}`;
  let bestMatch = 'Indie'; // Default category
  let maxMatches = 0;
  
  for (const [category, rules] of Object.entries(categoryRules)) {
    const matches = rules.keywords.filter(keyword => allText.includes(keyword));
    if (matches.length > maxMatches) {
      maxMatches = matches.length;
      bestMatch = category;
    }
  }
  
  return {
    ...gameInfo,
    category: bestMatch,
    isTrending: determineIfTrending(gameInfo)
  };
}

function determineIfTrending(gameInfo: GameInfo): boolean {
  // Simple trending logic based on player count and rating
  const playerCount = gameInfo.playerCount || 0;
  const rating = gameInfo.rating || 0;
  
  // Consider trending if high player count or high rating
  return playerCount > 50000 || rating > 4.0;
}

export function getCategoryInfo(category: string) {
  const categoryData = {
    'FPS': {
      name: 'First-Person Shooters',
      description: 'Fast-paced action games with first-person perspective',
      icon: '🎯',
      color: '#ef4444'
    },
    'Battle Royale': {
      name: 'Battle Royale',
      description: 'Last-player-standing survival games',
      icon: '🏆',
      color: '#f97316'
    },
    'MMO': {
      name: 'Massively Multiplayer Online',
      description: 'Large-scale online multiplayer games',
      icon: '🌐',
      color: '#3b82f6'
    },
    'Sandbox': {
      name: 'Sandbox & Creative',
      description: 'Open-world creative and building games',
      icon: '🧱',
      color: '#10b981'
    },
    'MOBA': {
      name: 'Multiplayer Online Battle Arena',
      description: 'Strategic team-based competitive games',
      icon: '⚔️',
      color: '#8b5cf6'
    },
    'Indie': {
      name: 'Indie Games',
      description: 'Independent and unique gaming experiences',
      icon: '🎨',
      color: '#ec4899'
    }
  };
  
  return categoryData[category as keyof typeof categoryData] || {
    name: category,
    description: 'Gaming category',
    icon: '🎮',
    color: '#6b7280'
  };
}
