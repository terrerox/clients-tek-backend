import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressInput } from './dto/inputs/create-address.input';
import { UpdateAddressInput } from './dto/inputs/update-address.input';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {}
  async create(createAddressInput: CreateAddressInput): Promise<Address> {
    const newAddress = this.addressesRepository.create(createAddressInput);
    await this.addressesRepository.save(newAddress);
    return this.findOne(newAddress.id);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressesRepository.find({
      relations: {
        client: true,
      },
    });
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressesRepository.findOne({
      where: { id },
      relations: {
        client: true,
      },
    });

    if (!address)
      throw new NotFoundException(`address with id: ${id} not found`);

    return address;
  }

  async update(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<Address> {
    const address = await this.addressesRepository.preload(updateAddressInput);

    if (!address)
      throw new NotFoundException(`address with id: ${id} not found`);

    await this.addressesRepository.save(address);

    return this.findOne(address.id);
  }

  async remove(id: string): Promise<Address> {
    const address = await this.findOne(id);
    await this.addressesRepository.remove(address);
    return { ...address, id };
  }
}
