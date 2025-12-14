import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siparis } from './siparis.entity';
import { SiparisUrunu } from './siparis-urunu.entity';
import { SiparislerService } from './siparisler.service';
import { SiparislerController } from './siparisler.controller';
import { Urun } from '../urunler/urun.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Siparis, SiparisUrunu, Urun])],
  controllers: [SiparislerController],
  providers: [SiparislerService],
})
export class SiparislerModule {}
