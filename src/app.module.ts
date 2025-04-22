import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ItemModule } from './modules/item/item.module';

@Module({
    imports: [ UserModule, ItemModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
