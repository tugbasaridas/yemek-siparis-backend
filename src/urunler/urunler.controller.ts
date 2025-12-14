import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UrunlerService } from './urunler.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('urunler')
export class UrunlerController {
  constructor(private readonly urunlerService: UrunlerService) {}

 
  @Get()
  findAll() {
    return this.urunlerService.findAll();
  }

  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const urun = await this.urunlerService.findOne(id);
    if (!urun) {
      throw new NotFoundException('Ürün bulunamadı');
    }
    return urun;
  }

 
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: any) {
    return this.urunlerService.create(dto);
  }

 
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: number, @Body() dto: any) {
    const updated = await this.urunlerService.update(id, dto);
    if (!updated) {
      throw new NotFoundException('Ürün bulunamadı');
    }
    return updated;
  }

 
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Param('id') id: number) {
 
    return this.urunlerService.delete(id);
  }
}
