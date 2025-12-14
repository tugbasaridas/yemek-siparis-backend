import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Kategori } from '../kategoriler/kategori.entity';
import { SiparisUrunu } from '../siparisler/siparis-urunu.entity';

@Entity('urunler')
export class Urun {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ad: string;

  @Column()
  aciklama: string;

  @Column('decimal')
  fiyat: number;

  @Column({ nullable: true })
  resim: string;

  @Column({ default: true })
  aktif: boolean;

  
  @ManyToOne(() => Kategori, (kategori) => kategori.urunler, {
  eager: true,
  nullable: true, 
})
kategori: Kategori | null;



  @OneToMany(() => SiparisUrunu, (su) => su.urun)
  siparisler: SiparisUrunu[];
}
