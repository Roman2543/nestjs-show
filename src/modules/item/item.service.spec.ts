import { ItemService } from './item.service';
import { Item } from 'src/common/utils/item.model';

describe('ItemService', () => {
    let itemService: ItemService;

    beforeEach(() => {
        itemService = new ItemService();
    });

    it('should return all items', () => {
        const items: Item[] = [
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
        expect(itemService.getItem()).toEqual(items);
    });

    it('should return item by id if found', () => {
        expect(itemService.getItemById('101')).toEqual({
            id: '101',
            name: 'Laptop',
            description: 'High-performance laptop with 16GB RAM and 512GB SSD',
            price: 1299.99,
            stock: 50,
        });
    });

    it('should return null if item not found', () => {
        expect(itemService.getItemById('999')).toBeNull();
    });
});
