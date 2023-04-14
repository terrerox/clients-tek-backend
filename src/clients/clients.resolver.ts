import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput, UpdateClientInput } from './dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Mutation(() => Client)
  createClient(
    @Args('createClientInput') createClientInput: CreateClientInput,
  ) {
    return this.clientsService.create(createClientInput);
  }

  @Query(() => [Client], { name: 'clients' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Query(() => Client, { name: 'client' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.clientsService.findOne(id);
  }

  @Mutation(() => Client)
  updateClient(
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ) {
    return this.clientsService.update(updateClientInput.id, updateClientInput);
  }

  @Mutation(() => Client)
  removeClient(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.clientsService.remove(id);
  }
}
