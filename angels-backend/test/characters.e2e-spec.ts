import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AuthGuard } from '@nestjs/passport';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'; // <-- Import de vitest
import { AppModule } from '../src/app.module.js';
import { CharactersService } from '../src/characters/characters.service.js';

describe('CharactersController (Integration)', () => {
  let app: INestApplication;

  // Utilisation de vi.fn() au lieu de jest.fn()
  const mockCharactersService = {
    create: vi
      .fn()
      .mockImplementation((userId, dto) =>
        Promise.resolve({ id: 'uuid-character-1', userId, ...dto, level: 1 }),
      ),
    findAllByUser: vi
      .fn()
      .mockImplementation((userId) =>
        Promise.resolve([{ id: 'uuid-character-1', userId, name: 'Arthas' }]),
      ),
    findByName: vi
      .fn()
      .mockImplementation((userId, name) =>
        Promise.resolve({ id: 'uuid-character-1', userId, name }),
      ),
    deleteByName: vi
      .fn()
      .mockImplementation((userId, name) => Promise.resolve({ count: 1 })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CharactersService)
      .useValue(mockCharactersService)
      .overrideGuard(AuthGuard('jwt'))
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { userId: 'mock-user-id', email: 'test@angels.com' };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/characters (POST) - should create a character successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/characters')
      .send({
        name: 'Arthas',
        className: 'WARRIOR',
        genre: 'MALE',
        race: 'HUMAN',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('Arthas');
    expect(response.body.userId).toEqual('mock-user-id');
  });

  it('/characters (GET) - should list characters for the authenticated user', async () => {
    const response = await request(app.getHttpServer())
      .get('/characters')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].userId).toEqual('mock-user-id');
  });
});
