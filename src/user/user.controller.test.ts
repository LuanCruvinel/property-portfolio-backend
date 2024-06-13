import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

const userEntityList: User[] = [
  Object.assign(new User(), {
    id: 1,
    name: 'João',
    userName: 'Lokao',
    email: 'john@email.com',
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

const userEntity: User =
  Object.assign(new User(), {
    name: 'Galileu',
    userName: 'Nelson',
    email: 'nelsim@gmail.com',
    password: '16661',
  });

const updateUserEntity: User =
  Object.assign(new User(), {
    name: 'Gracie',
  });

describe('UserController Tests', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntity),
            findAll: jest.fn().mockResolvedValue(userEntityList),
            findOne: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(updateUserEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get(UserController);
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('User Retrieval', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(userEntityList);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return the correct user object based on ID', async () => {
      const userId = 1;
      const result = await controller.findOne(userId);
      expect(result).toEqual(userEntityList[0]);
      expect(service.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('User Creation', () => {
    it('should create a new user', async () => {
      const newUser: CreateUserDto = {
        name: 'Alão',
        userName: 'Tor007',
        email: 'tororo@email.com',
        password: '1234',
      };
      const result = await controller.create(newUser);
      expect(result).toEqual(userEntity);
      expect(service.create).toHaveBeenCalledWith(newUser);
    });
  });

  describe('User Modification', () => {
    it('should update a user', async () => {
      const updatedUser: UpdateUserDto = {
        name: 'Gracie',
      };
      const ID_USER = 3;
      const result = await controller.update(ID_USER, updatedUser);
      expect(result).toEqual(updateUserEntity);
      expect(service.update).toHaveBeenCalledWith(ID_USER, updatedUser);
    });

    it('should remove a user', async () => {
      const ID_USER = 1;
      const result = await controller.remove(ID_USER);
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(ID_USER);
    });
  });
});

