import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Urun } from './urun.entity';
import { Kategori } from '../kategoriler/kategori.entity';

@Injectable()
export class UrunlerService {
  constructor(
    @InjectRepository(Urun)
    private readonly urunRepo: Repository<Urun>,
    @InjectRepository(Kategori)
    private readonly kategoriRepo: Repository<Kategori>,
  ) {}

  findAll() {
     return this.urunRepo.find({
      where: { aktif: true },
  });
  }

  findOne(id: number) {
    return this.urunRepo.findOne({ where: { id,aktif:true } });
  }

  async create(dto: any) {
    const kategori = await this.kategoriRepo.findOne({
      where: { id: dto.kategoriId },
    });

    if (!kategori) {
      throw new NotFoundException('Kategori bulunamadı');
    }

    const urun = this.urunRepo.create({
      ad: dto.ad,
      aciklama: dto.aciklama,
      fiyat: dto.fiyat,
      resim: dto.resim,
      kategori,
    });

    return this.urunRepo.save(urun);
  }

  async update(id: number, dto: any) {
    const urun = await this.urunRepo.findOne({ where: { id } });
    if (!urun) throw new NotFoundException("Ürün bulunamadı");

    if (dto.kategoriId) {
      const kategori = await this.kategoriRepo.findOne({
        where: { id: dto.kategoriId },
      });

      if (!kategori) {
        throw new NotFoundException("Kategori bulunamadı");
      }

      urun.kategori = kategori; 
    }

    urun.ad = dto.ad ?? urun.ad;
    urun.aciklama = dto.aciklama ?? urun.aciklama;
    urun.fiyat = dto.fiyat ?? urun.fiyat;
    urun.resim = dto.resim ?? urun.resim;

    return this.urunRepo.save(urun);
  }

async delete(id: number) {
 const urun = await this.urunRepo.findOne({
    where: { id },
    relations: ['siparisler'], 
  });

  if (!urun) {
    throw new NotFoundException('Ürün bulunamadı');
  }

 
  if (!urun.siparisler || urun.siparisler.length === 0) {
    await this.urunRepo.delete(id);
    return { tip: 'silindi' };
  }

 
  urun.aktif = false;
  await this.urunRepo.save(urun);

  return { tip: 'pasif' };
}

}
