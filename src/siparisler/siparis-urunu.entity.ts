import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Siparis } from './siparis.entity';
import { Urun } from '../urunler/urun.entity';

@Entity('siparis_urunleri')
export class SiparisUrunu {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Siparis, (siparis) => siparis.urunler)
  siparis: Siparis;

  @ManyToOne(() => Urun, (urun) => urun.siparisler, { eager: true })
  urun: Urun;

  @Column()
  adet: number;

  @Column('decimal')
  birim_fiyat: number;
}
