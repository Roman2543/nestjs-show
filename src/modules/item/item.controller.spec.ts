import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
    let itemController: ItemController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemController],
            providers: [
                {
                    provide: ItemService,
                    useValue: {
                        getItem: jest.fn().mockReturnValue('mocked item'),
                        getItemById: jest.fn().mockReturnValue('mocked item'),
                    },
                },
            ],
        }).compile();

        itemController = module.get<ItemController>(ItemController);
    });

    it('should be defined', () => {
        expect(itemController).toBeDefined();
    });

    it('should return an item', async () => {
        const result = await itemController.getItem();
        const expectedResult = {
            data: 'mocked item',
            message: 'Items fetched successfully',
            statusCode: 200,
        };

        expect(result).toEqual(expectedResult);
    });

    it('should return an item by id', async () => {
        const result = await itemController.getItemById('101');
        const expectedResult = {
            statusCode: 200,
            data: 'mocked item',
            message: 'Items fetched successfully',
        };
        expect(result).toEqual(expectedResult);
    });
});
