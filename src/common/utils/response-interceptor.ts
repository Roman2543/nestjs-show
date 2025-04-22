import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
    private readonly logger = new Logger(GlobalInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;
        const startTime = Date.now();

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - startTime;
                this.logger.log(`[${method}] ${url} - ${duration}ms`);
            }),
            map((response) => {
                if (!response || !response.statusCode || !response.message) {
                    context.switchToHttp().getResponse().status(404);
                    return {
                        statusCode: 404,
                        message: 'Response format is incorrect',
                        data: null,
                    };
                }

                const {
                    statusCode = 200,
                    message = response.message,
                    data = response.data,
                } = response;

                context.switchToHttp().getResponse().status(statusCode);

                return { statusCode, message, data };
            }),
            catchError((err) => {
                this.logger.error(`[${method}] ${url} - Error: ${err.message}`);
                context.switchToHttp().getResponse().status(500);
                throw err;
            })
        );
    }
}
