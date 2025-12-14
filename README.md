# Yemek Sipariş Uygulaması - Backend

Bu repository, Yemek Sipariş Uygulaması'nın backend (NestJS) kısmını içermektedir.

## Teknolojiler
- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- bcrypt

## Mimari
- Controller - Service - Module yapısı
- Entity tabanlı (Code First) veritabanı tasarımı
- Rol bazlı yetkilendirme (admin / musteri)

## Dosya Yönetimi
Kullanıcı tarafından yüklenen görseller sunucu tarafında `uploads` klasörü
üzerinde tutulmaktadır. Güvenlik ve repository boyutunu artırmamak amacıyla
bu klasör GitHub reposuna dahil edilmemiştir.

## Çalıştırma
```bash
npm install
npm run start:dev
