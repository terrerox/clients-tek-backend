import { InputType, Field, Float, ID } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  street: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  street2?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field(() => Number)
  @IsPositive()
  zipCode: number;

  @Field(() => ID)
  @IsUUID()
  clientId: string;
}
