import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Kullanici } from '../kullanicilar/kullanici.entity';
import { SiparisUrunu } from './siparis-urunu.entity';

export enum SiparisDurumu {
  HAZIRLANIYOR = 'hazırlanıyor',
  YOLDA = 'yolda',
  TESLIM_EDILDI = 'teslim edildi',
}

@Entity('siparisler')
export class Siparis {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Kullanici, (kullanici) => kullanici.siparisler, {
    eager: true,
  })
  musteri: Kullanici;

  @OneToMany(() => SiparisUrunu, (su) => su.siparis, { cascade: true, eager: true })
  urunler: SiparisUrunu[];

  @Column('decimal')
  toplam_fiyat: number;

  @Column({
    type: 'enum',
    enum: SiparisDurumu,
    default: SiparisDurumu.HAZIRLANIYOR,
  })
  durum: SiparisDurumu;

  @CreateDateColumn()
  olusturulma_tarihi: Date;
}
