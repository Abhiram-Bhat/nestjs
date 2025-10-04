import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { User } from '../src/users/user.entity';
import { UsersService } from '../src/users/users.service';

type MockRepo<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockUserRepo = (): MockRepo => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repo: MockRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepo() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new user and hash password', async () => {
    const createDto: CreateUserDto = { name: 'A', email: 'a@b.com', password: 'secret' };

    (repo.findOne as jest.Mock).mockResolvedValue(null);
    (repo.create as jest.Mock).mockImplementation(dto => dto);
    (repo.save as jest.Mock).mockImplementation(dto => Promise.resolve({ id: '1', ...dto }));

    const spyHash = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpass');

    const res = await service.create(createDto);

    expect(repo.findOne).toHaveBeenCalledWith({ where: { email: createDto.email } });
    expect(spyHash).toHaveBeenCalledWith(createDto.password, 10);
    expect(repo.save).toHaveBeenCalled();
    expect((res as any).email).toBe(createDto.email);
    spyHash.mockRestore();
  });

  it('should throw conflict when email exists', async () => {
    const createDto: CreateUserDto = { name: 'A', email: 'a@b.com', password: 'secret' };
    (repo.findOne as jest.Mock).mockResolvedValue({ id: '1', email: createDto.email });

    await expect(service.create(createDto)).rejects.toThrow();
  });

});
