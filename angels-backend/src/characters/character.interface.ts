export interface BasicCharacter {
  id: string; // UUID unique du personnage
  userId: string; // Id de angels-jwt-server
  name: string;
}

export interface Character extends BasicCharacter {
  genre: CharacterGenre;
  race: CharacterRace;
  className: CharacterClass;
  level: number;
  experience: number;

  // Attributs de base
  basicStats: BasicStats;

  // Position de Sauvegarde dans le monde (en cas de Respawn)
  lastPosition: LastPosition;

  createdAt: Date;
  updatedAt: Date;
}

export enum CharacterClass {
  WARRIOR = 'WARRIOR',
  ROGUE = 'ROGUE',
  MAGE = 'MAGE',
  PROPHET = 'PROPHET',
}

export enum CharacterGenre {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum CharacterRace {
  HUMAN = 'HUMAN',
  ELF = 'ELF',
}

export interface BasicStats {
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
  armor: number;
  damage: number;
  health: number;
  mana: number;
}

export interface LastPosition {
  mapId: string;
  x: number;
  y: number;
  z: number;
}
