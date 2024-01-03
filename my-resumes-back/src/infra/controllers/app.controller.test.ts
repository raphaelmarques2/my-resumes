import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { Server } from 'http';

describe('AppController', () => {
  let app: INestApplication;
  let server: Server;

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });

    const testingModule = await moduleBuilder.compile();

    app = testingModule.createNestApplication();
    await app.init();

    server = app.getHttpServer();
  });

  it('/ (GET)', async () => {
    return request(server).get('/').expect(200).expect('ok');
  });

  it('/health (GET)', async () => {
    return request(server).get('/health').expect(200).expect('ok');
  });
});
