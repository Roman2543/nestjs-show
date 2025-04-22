import { Test, TestingModule } from '@nestjs/testing';
import { ItemModule } from './item.module';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

describe('ItemModule', () => {
    let service: ItemService;
    let controller: ItemController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ItemModule],
        }).compile();

        service = module.get<ItemService>(ItemService);
        controller = module.get<ItemController>(ItemController);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(controller).toBeDefined();
    });
});
