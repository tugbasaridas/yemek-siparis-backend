import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kullanici } from './kullanicilar/kullanici.entity';
import { Rol } from './roller/rol.entity';
import { Kategori } from './kategoriler/kategori.entity';
import { Urun } from './urunler/urun.entity';
import { Siparis } from './siparisler/siparis.entity';
import { SiparisUrunu } from './siparisler/siparis-urunu.entity';
import { KullanicilarModule } from './kullanicilar/kullanicilar.module';
import { RollerModule } from './roller/roller.module';
import { KategorilerModule } from './kategoriler/kategoriler.module';
import { UrunlerModule } from './urunler/urunler.module';
import { SiparislerModule } from './siparisler/siparisler.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'yemekdb',
      synchronize: true,
      autoLoadEntities: true,
    }),
    KullanicilarModule,
    RollerModule,
    KategorilerModule,
    UrunlerModule,
    SiparislerModule,
    AuthModule,
    
  ],
})
export class AppModule {}
