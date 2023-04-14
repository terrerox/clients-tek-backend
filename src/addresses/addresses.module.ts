import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesResolver } from './addresses.resolver';
import { Address } from './entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AddressesResolver, AddressesService],
  imports: [TypeOrmModule.forFeature([Address])],
})
export class AddressesModule {}
