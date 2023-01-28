import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class AuthRegister {
  @IsPhoneNumber('RU', {
    message:
      'Wrong phonenumber. Phonenumber have to be with min length 11 symbols.',
  })
  @IsOptional()
  phonenumber?: string | null;

  @IsEmail(
    {},
    {
      message: 'Wrong email. Email have to be email type.',
    },
  )
  @IsOptional()
  email?: string | null;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    {
      message:
        'Wrong password. Password have to be with min length 8 symbols, with lower and uppercase, and has numbers',
    },
  )
  password: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    {
      message:
        'Wrong password. Password have to be with min length 8 symbols, with lower and uppercase, and have numbers',
    },
  )
  passwordRepeat: string;
}

export class AuthLogin {
  @IsPhoneNumber('RU', {
    message:
      'Wrong phonenumber. Phonenumber have to be with min length 11 symbols.',
  })
  contact: string;

  @IsString({
    message: 'Wrong password. Password have to be in.',
  })
  @MinLength(8, {
    message: 'Wrong password. Password have to be with min length 8 symbols.',
  })
  password: string;
}
