import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/common/utils/user.model';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        getUserById: jest.fn(),
                    },
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should return user data if found', async () => {
        const user = { id: 1, name: 'John Doe' } as User;
        jest.spyOn(userService, 'getUserById').mockReturnValue(user);

        const result = userController.getUser(1);

        const expectedResult = {
            statusCode: 200,
            message: 'User fetched successfully',
            data: user,
        };

        expect(result).toEqual(expectedResult);
    });

    it('should return error if user not found', async () => {
        jest.spyOn(userService, 'getUserById').mockReturnValue(null);

        const result = userController.getUser(1);

        const expectedResult = {
            statusCode: 400,
            message: 'User not found or invalid ID',
            data: null,
        };

        expect(result).toEqual(expectedResult);
    });
});
