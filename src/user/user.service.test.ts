import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

const userServiceTestEntityList: User[] = [
  Object.assign(new User(), {
    id: 1,
    name: 'Jubileu',
    userName: 'Lokao',
    email: 'jubileu@gmail.com',
    password: '12345',
  }),
  Object.assign(new User(), {
    id: 2,
    name: 'Galileu',
    userName: 'Nelson',
    email: 'nelsim@gmail.com',
    password: '16661',
  }),
];

describe('UserService Tests', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(userServiceTestEntityList[0]),
            save: jest.fn().mockResolvedValue(userServiceTestEntityList[0]),
            find: jest.fn().mockResolvedValue(userServiceTestEntityList),
            findOne: jest.fn().mockResolvedValue(userServiceTestEntityList[0]),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  describe('Initialization', () => {
    it('should be defined', async () => {
      expect(service).toBeDefined();
    });
  });

  describe('Creating Users', () => {
    it('should create a new user', async () => {
      const newUser: CreateUserDto = {
        name: 'Test User Create',
        userName: 'testUserCreate',
        email: 'test@email.com',
        password: '999999',
      };
      const result = await service.create(newUser);
      expect(result).toEqual(userServiceTestEntityList[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Finding Users', () => {
    it('should return all users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userServiceTestEntityList);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should find a user by ID', async () => {
      const ID_USER = 1;
      const user = await service.findOne(ID_USER);
      expect(user).toEqual(userServiceTestEntityList[0]);
    });
  });

  describe('Updating Users', () => {
    it('should update a user', async () => {
      const ID_USER = 1;
      const updateUserDto: UpdateUserDto = {
        name: 'Gracie' };
      await service.update(ID_USER, updateUserDto);
      expect(repository.update).toHaveBeenCalledWith(ID_USER, updateUserDto);
    });
  });

  describe('Deleting Users', () => {
    it('should delete a user', async () => {
      const ID_USER = 1;
      await service.remove(ID_USER);
      expect(repository.delete).toHaveBeenCalledWith(ID_USER);
    });
  });

});
