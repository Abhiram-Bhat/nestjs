import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) return null;
    const { password, ...rest } = user as any;
    return rest;
  }

  async login(user: { email: string; id: string; name?: string }) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signupAndLogin(createDto: any) {
    const user = await this.usersService.create(createDto);
    return this.login({ email: user.email, id: (user as any).id, name: user.name });
  }
}
