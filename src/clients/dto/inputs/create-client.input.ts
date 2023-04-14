import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateClientInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  document: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  cellPhone?: string;
}
