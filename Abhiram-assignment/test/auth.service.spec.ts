import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersService = {
    findByEmail: jest.fn(),
  };
  const mockJwtService = {
    sign: jest.fn().mockReturnValue('signed-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('validateUser returns user without password for valid credentials', async () => {
    const user = { id: '1', email: 'a@b.com', password: await bcrypt.hash('pass', 10), name: 'A' };
    mockUsersService.findByEmail.mockResolvedValue(user);

    const validated = await service.validateUser('a@b.com', 'pass');
    expect(validated).toHaveProperty('email', 'a@b.com');
  });

  it('login returns access_token', async () => {
    const res = await service.login({ email: 'a@b.com', id: '1', name: 'A' });
    expect(res).toEqual({ access_token: 'signed-token' });
  });
});
