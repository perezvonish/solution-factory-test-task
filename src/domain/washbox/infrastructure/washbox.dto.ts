import { IsNumber, IsString, MaxLength } from 'class-validator';

export class WashboxCreate {
  @IsString({
    message: 'Washbox title is not a string',
  })
  @MaxLength(16, {
    message: 'Washbox title have to equal or less than 16 symbols.',
  })
  title: string;
}

export class UpdateWashbox {
  @IsNumber(
    {},
    {
      message: 'Washbox id is not a number.',
    },
  )
  id: number;

  @IsString({
    message: 'Washbox title is not a string',
  })
  @MaxLength(16, {
    message: 'Washbox title have to equal or less than 16 symbols.',
  })
  title: string;
}

export class WashboxRemove {
  @IsNumber(
    {},
    {
      message: 'Washbox id is not a number.',
    },
  )
  id: number;
}

export class WashboxBook {
  @IsNumber(
    {},
    {
      message: 'Washbox id is not a number.',
    },
  )
  id: number;

  @IsNumber(
    {},
    {
      message: 'Car id is not a number.',
    },
  )
  carId: number;
}
