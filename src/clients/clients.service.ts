import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientInput } from './dto/inputs/create-client.input';
import { UpdateClientInput } from './dto/inputs/update-client.input';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}
  async create(createClientInput: CreateClientInput): Promise<Client> {
    const newClient = this.clientsRepository.create(createClientInput);
    return await this.clientsRepository.save(newClient);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find({
      relations: {
        addresses: true,
      },
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client) throw new NotFoundException(`client with id: ${id} not found`);

    return client;
  }

  async update(
    id: string,
    updateClientInput: UpdateClientInput,
  ): Promise<Client> {
    const client = await this.clientsRepository.preload(updateClientInput);

    if (!client) throw new NotFoundException(`client with id: ${id} not found`);

    return this.clientsRepository.save(client);
  }

  async remove(id: string): Promise<Client> {
    const client = await this.findOne(id);
    await this.clientsRepository.remove(client);
    return { ...client, id };
  }
}
