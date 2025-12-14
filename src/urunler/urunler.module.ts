import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urun } from './urun.entity';
import { Kategori } from '../kategoriler/kategori.entity';
import { UrunlerService } from './urunler.service';
import { UrunlerController } from './urunler.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Urun, Kategori])],
  controllers: [UrunlerController],
  providers: [UrunlerService],
})
export class UrunlerModule {}
