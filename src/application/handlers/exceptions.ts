import { HttpStatus, ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

interface Exception {
  errorCode: number;
  engMessage: string;
  ruMessage: string;
}

export const RegisterPassRepeat: Exception = {
  errorCode: HttpStatus.BAD_REQUEST,
  engMessage: 'Passwords do not same',
  ruMessage: 'Пароли не совпадают.',
};

export const RegisterBodyException: Exception = {
  errorCode: HttpStatus.BAD_REQUEST,
  engMessage: 'Registration body error.',
  ruMessage: 'Ошибка в теле запроса регистрации.',
};

export const LoginBodyException: Exception = {
  errorCode: HttpStatus.BAD_REQUEST,
  engMessage: 'Login body error.',
  ruMessage: 'Ошибка в теле запроса авторизации.',
};

export const RegisterConflictBcrypt: Exception = {
  errorCode: HttpStatus.CONFLICT,
  engMessage: 'Error while password be bcrypt.',
  ruMessage: 'Ошибка при зашифровывании пароля.',
};

export const RegisterConflictDebcryptException: Exception = {
  errorCode: HttpStatus.CONFLICT,
  engMessage: 'Error while password be debcrypt.',
  ruMessage: 'Ошибка при дешифровке пароля.',
};

export const LoginUnauthorizedException: Exception = {
  errorCode: HttpStatus.UNAUTHORIZED,
  engMessage: 'The login information is invalid.',
  ruMessage: 'Данные для входа недействительны.',
};

export const UserNotFoundException: Exception = {
  errorCode: HttpStatus.NOT_FOUND,
  engMessage: 'User does not found.',
  ruMessage: 'Пользователь не найден.',
};

export const AccountAvailabilityException: Exception = {
  errorCode: HttpStatus.FORBIDDEN,
  engMessage: 'User already registered.',
  ruMessage: 'Пользователь уже зарегестрирован.',
};

export const CarsUniqueSerialNumber: Exception = {
  errorCode: HttpStatus.BAD_REQUEST,
  engMessage: "Car's serial number is already registered.",
  ruMessage: 'Серийный номер автомобиля уже зарегестрирован.',
};

export const CarsNotFoundSerial: Exception = {
  errorCode: HttpStatus.NOT_FOUND,
  engMessage: "Car's serial number did not found.",
  ruMessage: 'Серийный номер автомобиля не найден.',
};

export const WashboxNotFound: Exception = {
  errorCode: HttpStatus.NOT_FOUND,
  engMessage: 'Washbox did not found.',
  ruMessage: 'Позиция на мойке не найдена.',
};

export const RegisterTokenConfilct: Exception = {
  errorCode: HttpStatus.CONFLICT,
  engMessage: 'Conflict exception while access token register.',
  ruMessage: 'Конфликт при регистрации токена доступа.',
};

export const SavingTokenConfilct: Exception = {
  errorCode: HttpStatus.CONFLICT,
  engMessage: 'Conflict exception while access token save.',
  ruMessage: 'Конфликт при сохранении токена доступа.',
};

export const WashboxCarAvaliability: Exception = {
  errorCode: HttpStatus.BAD_REQUEST,
  engMessage: 'Car has already visit',
  ruMessage: 'Машина уже стоит на мойке.',
};

export const NotUserCar: Exception = {
  errorCode: HttpStatus.BAD_REQUEST,
  engMessage: 'Car is a own other user.',
  ruMessage: 'Автомобиль принадлежит другому пользователю.',
};

export const WashboxNotEmpty: Exception = {
  errorCode: HttpStatus.BAD_REQUEST,
  engMessage: 'Washbox is not empty.',
  ruMessage: 'Мойка занята.',
};

export const CarNotFree: Exception = {
  errorCode: HttpStatus.BAD_REQUEST,
  engMessage: 'Car already id washbox.',
  ruMessage: 'Автомобиль уже на мойке.',
};
