import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Urun } from '../urunler/urun.entity';

@Entity('kategoriler')
export class Kategori {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ad: string; 

  @OneToMany(() => Urun, (urun) => urun.kategori)
  urunler: Urun[];
}
