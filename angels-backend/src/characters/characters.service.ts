import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CharacterNameDto } from './character-name.dto.js';
import { BasicStats, CharacterClass } from './character.interface.js';
import { CreateCharacterDto } from './create-character.dto.js';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createCharacterDto: CreateCharacterDto) {
    const { name, className, genre, race } = createCharacterDto;

    // 1. Vérifier si un personnage avec le même nom existe déjà
    const existingCharacter = await this.prisma.character.findUnique({
      where: { userId, name },
    });

    if (existingCharacter) {
      throw new BadRequestException('Ce nom de personnage est déjà utilisé.');
    }

    // 2. Calcul des stats de base
    const baseStats = this.getInitialBasicsStats(className);

    // 3. Créer l'entité relationelle personnage via Prisma
    return this.prisma.character.create({
      data: {
        id: crypto.randomUUID(), // ou autre générateur d'ID
        userId, // ID récupéré du token JWT de ton angels-jwt-server
        name,
        className,
        genre,
        race,
        level: 1,
        experience: 0,
        basicStats: {
          create: baseStats,
        },
        lastPosition: {
          create: {
            mapId: 'starting_village',
            x: 100,
            y: 0,
            z: 100,
          },
        },
      },
      include: {
        basicStats: true,
        lastPosition: true,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.character.findMany({
      where: { userId },
      include: {
        basicStats: true,
        lastPosition: true,
      },
    });
  }

  async findByName(userId: string, dto: CharacterNameDto) {
    const { name } = dto;
    return this.prisma.character.findUnique({
      where: { userId, name },
      include: {
        basicStats: true,
        lastPosition: true,
      },
    });
  }

  async deleteByName(userId: string, dto: CharacterNameDto) {
    const { name } = dto;
    const existingCharacter = await this.prisma.character.findUnique({
      where: { userId, name },
    });

    if (!existingCharacter) {
      throw new BadRequestException(`Le personnage ${name} n'existe pas.`);
    }
    return await this.prisma.character.delete({
      where: { userId, name },
    });
  }

  private getInitialBasicsStats(className: CharacterClass): BasicStats {
    let stats = {
      strength: 8,
      agility: 8,
      intelligence: 8,
      vitality: 8,
      armor: 150,
      damage: 10,
      health: 150,
      mana: 80,
    };

    switch (className) {
      case CharacterClass.WARRIOR:
        stats.strength += 12;
        stats.agility += 7;
        stats.armor *= 1.2;
        stats.damage *= 1.2;
        break;
      case CharacterClass.MAGE:
        stats.agility += 2;
        stats.intelligence += 12;
        stats.vitality += 5;
        stats.armor *= 1.1;
        stats.damage *= 1.1;
        break;
      case CharacterClass.PROPHET:
        stats.strength += 3;
        stats.intelligence += 4;
        stats.vitality += 12;
        break;
      case CharacterClass.ROGUE:
        stats.strength += 2;
        stats.agility += 12;
        stats.intelligence += 5;
        stats.damage *= 1.05;
        break;
    }

    return stats;
  }
}
