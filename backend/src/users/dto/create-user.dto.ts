import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(5)
  password: string;
  @IsString()
  passphrase: string;
}
