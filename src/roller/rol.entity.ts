import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Kullanici } from '../kullanicilar/kullanici.entity';

@Entity('roller')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ad: string; 

  @OneToMany(() => Kullanici, (kullanici) => kullanici.rol)
  kullanicilar: Kullanici[];
}
