import { MinLength } from 'class-validator';

export class RegisterDto {
  ad: string;
  email: string;
  @MinLength(4, { message: 'Şifre en az 4 karakter olmalıdır' })
  sifre: string;
  rolId: number; 
}
