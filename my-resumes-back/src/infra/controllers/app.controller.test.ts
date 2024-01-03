import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });

    const testingModule = await moduleBuilder.compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('ok');
  });
});
