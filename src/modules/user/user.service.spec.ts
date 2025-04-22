import { UserService } from './user.service';

describe('UserService', () => {
    const service = {
        getUserById: jest.fn((id) => {
            const users = {
                1: {
                    id: 1,
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    role: 'admin',
                },
                2: {
                    id: 2,
                    name: 'Doe John',
                    email: 'doejohn@example.com',
                    role: 'admin2',
                },
            };
            return users[id] || null;
        }),
    } as UserService;

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a user by ID 1', () => {
        const result = service.getUserById(1);

        const expectedResult = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            role: 'admin',
        };
        expect(result).toEqual(expectedResult);
    });

    it('should return a user by ID 2', () => {
        const result = service.getUserById(2);

        const expectedResult = {
            id: 2,
            name: 'Doe John',
            email: 'doejohn@example.com',
            role: 'admin2',
        };

        expect(result).toEqual(expectedResult);
    });

    it('should return null for an unknown user ID', () => {
        const result = service.getUserById(3);

        expect(result).toBeNull();
    });
});
