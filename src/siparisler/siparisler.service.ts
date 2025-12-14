import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Siparis } from './siparis.entity';
import { SiparisUrunu } from './siparis-urunu.entity';
import { Urun } from '../urunler/urun.entity';
import { Kullanici } from '../kullanicilar/kullanici.entity';
import { SiparisDurumu } from './siparis.entity';

@Injectable()
export class SiparislerService {
  constructor(
    @InjectRepository(Siparis)
    private readonly siparisRepo: Repository<Siparis>,

    @InjectRepository(SiparisUrunu)
    private readonly siparisUrunRepo: Repository<SiparisUrunu>,

    @InjectRepository(Urun)
    private readonly urunRepo: Repository<Urun>,
  ) {}

  
  async create(dto: any, musteri: any) {

     if (!dto.urunler || dto.urunler.length === 0) {
    throw new NotFoundException("Sepet boş, sipariş oluşturulamaz");
  }
    const siparisUrunleri: SiparisUrunu[] = [];
    let toplamFiyat = 0;

    for (const item of dto.urunler) {
      const urun = await this.urunRepo.findOne({
        where: { id: item.urunId },
      });

      if (!urun) {
        throw new NotFoundException(`Ürün bulunamadı: ${item.urunId}`);
      }

      const siparisUrunu = this.siparisUrunRepo.create({
        urun,
        adet: item.adet,
        birim_fiyat: Number(urun.fiyat),
      });

      toplamFiyat += Number(urun.fiyat) * item.adet;
      siparisUrunleri.push(siparisUrunu);
    }

    const yeniSiparis = this.siparisRepo.create({
      musteri: { id: musteri.id } as Kullanici,
      urunler: siparisUrunleri,
      toplam_fiyat: toplamFiyat,
    });

    return this.siparisRepo.save(yeniSiparis);
  }

 
  async getByUser(userId: number) {
    return this.siparisRepo.find({
      where: { musteri: { id: userId } },
      order: { olusturulma_tarihi: 'DESC' },
    });
  }

 
  async getAll() {
    return this.siparisRepo.find({
      order: { olusturulma_tarihi: 'DESC' },
    });
  }

  
  async updateDurum(id: number, yeniDurum: SiparisDurumu) {
    if (!Object.values(SiparisDurumu).includes(yeniDurum)) {
      throw new NotFoundException('Geçersiz sipariş durumu');
    }

    const siparis = await this.siparisRepo.findOne({
      where: { id },
    });

    if (!siparis) {
      throw new NotFoundException('Sipariş bulunamadı');
    }

    siparis.durum = yeniDurum;
    return this.siparisRepo.save(siparis);
  }
}
