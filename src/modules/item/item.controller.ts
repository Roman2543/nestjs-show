import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Item') // Swagger UI tag
@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get('all')
    @ApiOperation({
        summary: 'Get all items',
        description: 'Retrieving all available items from the system.',
    })
    @ApiResponse({ status: 200, description: 'Items fetched successfully' })
    @ApiResponse({ status: 400, description: 'Error fetching items' })
    getItem() {
        const item = this.itemService.getItem();
        if (!item) {
            return { statusCode: 400, message: 'Item not found', data: null };
        }
        return {
            statusCode: 200,
            message: 'Items fetched successfully',
            data: item,
        };
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get item by ID',
        description: 'Retrieve an item by its ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the item',
        required: true,
        type: String,
    })
    @ApiResponse({ status: 200, description: 'Item fetched successfully' })
    @ApiResponse({ status: 400, description: 'Item not found' })
    async getItemById(@Param('id') id: string) {
        const item = this.itemService.getItemById(id);
        if (!item) {
            return { statusCode: 400, message: 'Item not found', data: null };
        }
        return {
            statusCode: 200,
            message: 'Items fetched successfully',
            data: item,
        };
    }
}
