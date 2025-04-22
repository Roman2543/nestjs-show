import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User') // Swagger UI tag
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all user',
        description: 'Retrieving User Information from the System By Id.',
    })
    @ApiQuery({
        name: 'id',
        description: 'The ID of the user ',
        required: true,
        type: Number,
    })
    @ApiResponse({ status: 200, description: 'User fetched successfully' })
    @ApiResponse({ status: 400, description: 'User not found or invalid ID' })
    getUser(@Query('id') id: number) {
        const user = this.userService.getUserById(id);
        if (!user) {
            return {
                statusCode: 400,
                message: 'User not found or invalid ID',
                data: null,
            };
        }
        return {
            statusCode: 200,
            message: 'User fetched successfully',
            data: user,
        };
    }
}
