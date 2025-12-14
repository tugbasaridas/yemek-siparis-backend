import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SiparislerService } from './siparisler.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SiparisDurumu } from './siparis.entity';

@Controller('siparisler')
export class SiparislerController {
  constructor(private readonly service: SiparislerService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: any, @Request() req: any) {
    return this.service.create(dto, req.user);
  }

 
  @UseGuards(JwtAuthGuard)
  @Get('musteri')
  getMyOrders(@Request() req: any) {
    return this.service.getByUser(req.user.id);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getAll() {
    return this.service.getAll();
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post(':id/durum')
  updateDurum(@Param('id') id: number, @Body() body: any) {
    return this.service.updateDurum(id, body.durum as SiparisDurumu);
  }
}
