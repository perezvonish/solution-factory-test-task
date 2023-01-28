import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CarCreation {
  @IsString({
    message: "Car's brand is not a string.",
  })
  @MaxLength(32, {
    message: "Car's brand number is more than 64 symbols.",
  })
  brand: string;

  @IsString({
    message: "Car's title is not a string.",
  })
  @MaxLength(32, {
    message: "Car's title number is more than 32 symbols.",
  })
  title: string;

  @IsString({
    message: "Car's serialNumber is not a string.",
  })
  @MinLength(9, {
    message: "Car's serial number is less than 9 symbols.",
  })
  @MaxLength(9, {
    message: "Car's serial number is more than 9 symbols.",
  })
  serialNumber: string;

  @IsOptional()
  photo?;
}

export class RemoveCar {
  @IsString({
    message: "Car's serialNumber is not a string.",
  })
  @MinLength(9, {
    message: "Car's serial number is less than 9 symbols.",
  })
  @MaxLength(9, {
    message: "Car's serial number is more than 9 symbols.",
  })
  serialNumber: string;
}
