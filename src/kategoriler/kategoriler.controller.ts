import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { KategorilerService } from './kategoriler.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('kategoriler')
export class KategorilerController {
  constructor(private readonly kategoriService: KategorilerService) {}

  @Get()
  findAll() {
    return this.kategoriService.findAll();
  }


  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: any) {
    return this.kategoriService.create(dto);
  }

 
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: any) {
    return this.kategoriService.update(id, dto);
  }

  
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Param('id') id: number) {
    return this.kategoriService.delete(id);
  }
}
