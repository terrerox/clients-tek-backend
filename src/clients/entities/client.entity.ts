import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Address } from 'src/addresses/entities/address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients' })
@ObjectType()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  document: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  cellPhone?: string;

  @OneToMany(() => Address, (address) => address.client, { nullable: true })
  @Field(() => [Address], { nullable: true })
  addresses?: Address[];
}
