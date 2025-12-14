import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Kullanici } from '../kullanicilar/kullanici.entity';
import { Rol } from '../roller/rol.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Kullanici)
    private readonly kullaniciRepo: Repository<Kullanici>,
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: any) {
    const rol = await this.rolRepo.findOne({ where: { id: dto.rolId } });
    if (!rol) throw new NotFoundException('Rol bulunamadı');

    const hashed = await bcrypt.hash(dto.sifre, 10);

    const yeni = this.kullaniciRepo.create({
      ad: dto.ad,
      email: dto.email,
      sifre: hashed,
      rol,
    });

    return this.kullaniciRepo.save(yeni);
  }

  async login(dto: any) {
    const kullanici = await this.kullaniciRepo.findOne({
      where: { email: dto.email },
    });

    if (!kullanici) throw new UnauthorizedException('Email hatalı');

    const sifreDogru = await bcrypt.compare(dto.sifre, kullanici.sifre);
    if (!sifreDogru) throw new UnauthorizedException('Şifre yanlış');

    const token = this.jwtService.sign({
      id: kullanici.id,
      rol: kullanici.rol.ad,
    });

    return {
      message: 'Giriş başarılı',
      token,
    };
  }
}
