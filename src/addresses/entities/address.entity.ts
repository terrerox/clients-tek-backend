import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Client } from 'src/clients/entities/client.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
@ObjectType()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  street: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  street2?: string;

  @Column()
  @Field(() => String)
  city: string;

  @Column()
  @Field(() => Number)
  zipCode: number;

  @ManyToOne(() => Client, (client) => client.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  @Field(() => Client)
  client: Client;

  @Column()
  @Field(() => ID)
  clientId: string;
}
