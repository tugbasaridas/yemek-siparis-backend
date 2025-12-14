import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kategori } from './kategori.entity';
import { KategorilerService } from './kategoriler.service';
import { KategorilerController } from './kategoriler.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Kategori])],
  controllers: [KategorilerController],
  providers: [KategorilerService],
})
export class KategorilerModule {}
