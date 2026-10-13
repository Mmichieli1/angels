import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  CharacterClass,
  CharacterGenre,
  CharacterRace,
} from './character.interface.js';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Le nom du personnage doit faire au moins 3 charactères.',
  })
  @MaxLength(20, {
    message: 'Le nom du personnage ne peut excéder 20 charactères.',
  })
  @ApiProperty()
  name: string;

  @IsEnum(CharacterClass, { message: 'Classe de personnage invalide' })
  @IsNotEmpty()
  @ApiProperty()
  className: CharacterClass;

  @IsEnum(CharacterGenre, { message: 'Genre de personnage invalide' })
  @IsNotEmpty()
  @ApiProperty()
  genre: CharacterGenre;

  @IsEnum(CharacterRace, { message: 'Race de personnage invalide' })
  @IsNotEmpty()
  @ApiProperty()
  race: CharacterRace;
}
