import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { App2Controller } from './app2.controller';
import { configurations } from './infra/services/MyConfigService';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configurations] })],
  controllers: [App2Controller],
  providers: [],
})
export class App2Module {}
