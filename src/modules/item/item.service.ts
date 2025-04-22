import { Injectable } from '@nestjs/common';
import { Item } from 'src/common/utils/item.model';

@Injectable()
export class ItemService {
    getItem(): Item[] {
        return [
            {
                id: '101',
                name: 'Laptop',
                description:
                    'High-performance laptop with 16GB RAM and 512GB SSD',
                price: 1299.99,
                stock: 50,
            },
            {
                id: '102',
                name: 'TopLap',
                description: 'Low-performance toplap with 1GB RAM and 5GB SSD',
                price: 20.2,
                stock: 5000,
            },
        ];
    }

    getItemById(id: string): Item | null {
        if (id == '101') {
            return {
                id: '101',
                name: 'Laptop',
                description:
                    'High-performance laptop with 16GB RAM and 512GB SSD',
                price: 1299.99,
                stock: 50,
            };
        } else if (id == '102') {
            return {
                id: '102',
                name: 'TopLap',
                description: 'Low-performance toplap with 1GB RAM and 5GB SSD',
                price: 20.2,
                stock: 5000,
            };
        }

        return null;
    }
}
