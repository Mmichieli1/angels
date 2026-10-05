import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AuthModule } from './auth/auth.module.js';
import { CharactersModule } from './characters/characters.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [PrismaModule, AuthModule, CharactersModule],
})
export class AppModule {}
