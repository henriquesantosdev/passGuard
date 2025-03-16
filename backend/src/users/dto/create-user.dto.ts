import { IsEmail, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @Min(5)
  password: string;
}
