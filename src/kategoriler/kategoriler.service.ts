import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kategori } from './kategori.entity';

@Injectable()
export class KategorilerService {
  constructor(
    @InjectRepository(Kategori)
    private readonly kategoriRepo: Repository<Kategori>,
  ) {}

  findAll() {
    return this.kategoriRepo.find();
  }

  async findOne(id: number) {
    const kategori = await this.kategoriRepo.findOne({ where: { id } });
    if (!kategori) throw new NotFoundException("Kategori bulunamadı");
    return kategori;
  }

  create(dto: any) {
    const kategori = this.kategoriRepo.create(dto);
    return this.kategoriRepo.save(kategori);
  }

  async update(id: number, dto: any) {
    const kategori = await this.findOne(id);
    Object.assign(kategori, dto);
    return this.kategoriRepo.save(kategori);
  }

  async delete(id: number) {
    const sonuc = await this.kategoriRepo.delete(id);
    if (sonuc.affected === 0) throw new NotFoundException("Kategori bulunamadı");
    return { mesaj: "Kategori silindi" };
  }
}
