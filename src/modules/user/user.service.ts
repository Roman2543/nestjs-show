import { Injectable } from '@nestjs/common';
import { User } from 'src/common/utils/user.model';

@Injectable()
export class UserService {
    getUserById(id: number): User | null {
        if (id == 1) {
            return {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                role: 'admin',
            };
        } else if (id == 2) {
            return {
                id: 2,
                name: 'Doe John',
                email: 'doejohn@example.com',
                role: 'admin2',
            };
        }

        return null;
    }
}
