import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokensService } from '../../domain/tokens/tokens.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly tokensService: TokensService) {
    super();
  }

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const result = false;
  //   const request = context.switchToHttp().getRequest();
  //
  //   const { headers } = request;
  //
  //   if (headers.authorization) {
  //     const accessToken = headers.authorization.replace('Bearer ', '').trim();
  //     const test = await this.tokensService.findOne(accessToken);
  //
  //     if (!test) {
  //       throw new UnauthorizedException();
  //     }
  //   }
  //
  //   return result;
  // }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
