import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CharacterNameDto {
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
}
