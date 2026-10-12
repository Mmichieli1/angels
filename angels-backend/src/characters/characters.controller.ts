import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { KeycloakUserPayload } from '../auth/jwt-payload.type.js';
import { CharacterNameDto } from './character-name.dto.js';
import { CharactersService } from './characters.service.js';
import { CreateCharacterDto } from './create-character.dto.js';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  private extractUserId(req: Request) {
    // Récupération du userId injecté par le middleware/guard JWT
    const user = req.user as KeycloakUserPayload;
    return user?.userId || 'mock-user-id';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({
    summary: 'Créer un nouveau personnage',
  })
  @ApiResponse({ status: 201, description: 'Renvoie le personnage créé' })
  create(
    @Req() req: Request,
    @Body()
    dto: CreateCharacterDto,
  ) {
    return this.characterService.create(this.extractUserId(req), dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({
    summary: "Récupérer la liste des personnages de l'utilisateur",
  })
  @ApiResponse({ status: 200, description: 'Liste vide si aucun personnage.' })
  getAllByUser(@Req() req: Request) {
    return this.characterService.findAllByUser(this.extractUserId(req));
  }

  @Get('/name')
  @ApiOperation({
    summary: 'Récupérer un personnage',
  })
  @ApiResponse({ status: 200, description: 'Personnage' })
  getByName(@Req() req: Request, @Body() dto: CharacterNameDto) {
    return this.characterService.findByName(this.extractUserId(req), dto);
  }

  @Delete('/name')
  @ApiOperation({
    summary: "Suppression d'un personnage",
  })
  @ApiResponse({ status: 200, description: 'Renvoie le personnage supprimé' })
  removeByName(@Req() req: Request, @Body() dto: CharacterNameDto) {
    return this.characterService.deleteByName(this.extractUserId(req), dto);
  }
}
