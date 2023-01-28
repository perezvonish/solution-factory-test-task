import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { FindOptionsWhere } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import * as bcrypt from 'bcrypt';
import { AuthLogin, AuthRegister } from './infrastructure/auth.dto';
import { UserCreate } from '../users/infrastructure/users.dto';
import {
  AccountAvailabilityException,
  LoginUnauthorizedException,
  RegisterBodyException,
  RegisterConflictBcrypt,
  RegisterConflictDebcryptException,
  RegisterPassRepeat,
  RegisterTokenConfilct,
  SavingTokenConfilct,
  UserNotFoundException,
} from '../../application/handlers/exceptions';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from '../../application/strategies/local.strategy';
import { TokenCreation, TokensService } from '../tokens/tokens.service';
import { addDays } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService,
  ) {}

  async register(data: AuthRegister): Promise<UsersEntity> {
    const user: UserCreate = { password: '' };
    let contact: string;

    if (
      (data.email && data.phonenumber) ||
      (!data.email && !data.phonenumber) ||
      !data.password ||
      !data.passwordRepeat
    ) {
      throw new BadRequestException(RegisterBodyException);
    }
    if (data.password !== data.passwordRepeat) {
      throw new BadRequestException(RegisterPassRepeat);
    }

    if (data.email) {
      user.email = data.email;
      contact = data.email;
    } else {
      user.phonenumber = data.phonenumber;
      contact = data.phonenumber;
    }

    await this.checkAccountAvailability(contact);
    user.password = await this.cryptPassword(data.password);

    return await this.userService.save(user);
  }

  async login(user: UsersEntity) {
    const date = addDays(new Date(), 1);

    const payload: TokenCreation = {
      userId: user.id,
      email: user.email,
      phonenumber: user.phonenumber,
      token: '',
      expiresAt: date,
    };

    const accessToken = this.jwtService.sign(payload);
    if (!accessToken) {
      throw new ConflictException(RegisterTokenConfilct);
    }

    payload.token = accessToken;

    const savedToken = await this.tokensService.save(payload);
    if (!savedToken) {
      throw new ConflictException(SavingTokenConfilct);
    }

    return { savedToken };
  }

  async checkAccountAvailability(contact: string): Promise<boolean> {
    if (await this.userService.findOne({ phonenumber: contact })) {
      throw new ForbiddenException(AccountAvailabilityException);
    }
    if (await this.userService.findOne({ email: contact })) {
      throw new ForbiddenException(AccountAvailabilityException);
    }
    return true;
  }

  async validateUser(body: AuthLogin): Promise<UserResponse> {
    let clause: FindOptionsWhere<UsersEntity>;

    clause = {
      phonenumber: body.contact,
    };
    let user = await this.userService.findOne(clause);
    if (!user) {
      clause = {
        email: body.contact,
      };
      user = await this.userService.findOne(clause);
    }
    if (!user) {
      throw new NotFoundException(UserNotFoundException);
    }

    const validation = await this.validatePassword(user, body.password);
    if (validation) {
      return {
        id: user.id,
        email: user.email,
        phonenumber: user.phonenumber,
      };
    }
    throw new UnauthorizedException(LoginUnauthorizedException);
  }

  async validatePassword(
    user: UsersEntity,
    password: string,
  ): Promise<boolean> {
    return await this.decryptPassword(password, user.password);
  }

  async cryptPassword(password: string): Promise<string> {
    return await bcrypt
      .hash(password, 10)
      .then((result) => {
        return result;
      })
      .catch(() => {
        throw new ConflictException(RegisterConflictBcrypt);
      });
  }

  async decryptPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt
      .compare(password, hash)
      .then((result) => {
        return result;
      })
      .catch(() => {
        throw new ConflictException(RegisterConflictDebcryptException);
      });
  }
}
