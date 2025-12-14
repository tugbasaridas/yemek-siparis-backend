import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Rol } from '../roller/rol.entity';
import { Siparis } from '../siparisler/siparis.entity';

@Entity('kullanicilar')
export class Kullanici {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ad: string;

  @Column({ unique: true })
  email: string;

  @Column()
  sifre: string;

  @ManyToOne(() => Rol, (rol) => rol.kullanicilar, { eager: true })
  rol: Rol;

  @OneToMany(() => Siparis, (siparis) => siparis.musteri)
  siparisler: Siparis[];
}
