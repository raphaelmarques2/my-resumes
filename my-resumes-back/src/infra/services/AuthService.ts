import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthOutputDto } from '../../domain/application/dtos/AuthOutputDto';
import { LoginDto } from '../../domain/application/dtos/LoginDto';
import { SignupDto } from '../../domain/application/dtos/SignupDto';
import { UserDto } from '../../domain/application/dtos/UserDto';
import { UserService } from '../../domain/application/services/UserService';

type TokenPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(input: SignupDto): Promise<AuthOutputDto> {
    const userDto = await this.userService.create({
      name: input.name,
      email: input.email,
    });
    const token = await this.generateToken(userDto);
    return {
      token,
      user: userDto,
    };
  }

  async login(input: LoginDto): Promise<AuthOutputDto> {
    const userDto = await this.userService
      .findByEmail(input.email)
      .catch(() => null);
    if (!userDto) {
      throw new UnauthorizedException();
    }
    if (input.password !== '123') {
      throw new UnauthorizedException();
    }
    const token = await this.generateToken(userDto);
    return {
      token,
      user: userDto,
    };
  }

  async authenticate(token: string): Promise<AuthOutputDto> {
    const tokenData = await this.extractToken(token);
    const userDto = await this.userService.findById(tokenData.sub);
    const newToken = await this.generateToken(userDto);
    return {
      token: newToken,
      user: userDto,
    };
  }

  private async generateToken(user: UserDto): Promise<string> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
  private async extractToken(token: string): Promise<TokenPayload> {
    const payload = await this.jwtService.verifyAsync<TokenPayload>(token);
    return payload;
  }
}
