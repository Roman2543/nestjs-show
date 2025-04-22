import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { Logger } from '@nestjs/common';
import { GlobalInterceptor } from './response-interceptor';

describe('GlobalInterceptor', () => {
    let interceptor: GlobalInterceptor;
    let mockExecutionContext: ExecutionContext;
    let mockCallHandler: CallHandler;
    let loggerSpy: jest.SpyInstance;

    beforeEach(() => {
        interceptor = new GlobalInterceptor();
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest
                    .fn()
                    .mockReturnValue({ method: 'GET', url: '/test' }),
                getResponse: jest.fn().mockReturnValue({ status: jest.fn() }),
            }),
        } as unknown as ExecutionContext;
        mockCallHandler = {
            handle: jest
                .fn()
                .mockReturnValue(
                    of({ statusCode: 200, message: 'Success', data: {} })
                ),
        };

        // Spy on Logger methods instead of mocking the whole Logger class
        loggerSpy = jest
            .spyOn(Logger.prototype, 'log')
            .mockImplementation(() => {});
        jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original Logger behavior
    });

    it('should log the request and return transformed response', (done) => {
        interceptor
            .intercept(mockExecutionContext, mockCallHandler)
            .subscribe((result) => {
                expect(result).toEqual({
                    statusCode: 200,
                    message: 'Success',
                    data: {},
                });
                expect(loggerSpy).toHaveBeenCalled();
                done();
            });
    });

    it('should handle missing response fields and return 404 error response', (done) => {
        mockCallHandler.handle = jest.fn().mockReturnValue(of(null));
        interceptor
            .intercept(mockExecutionContext, mockCallHandler)
            .subscribe((result) => {
                expect(result).toEqual({
                    statusCode: 404,
                    message: 'Response format is incorrect',
                    data: null,
                });
                done();
            });
    });

    it('should log an error and propagate exceptions', (done) => {
        const error = new Error('Test error');
        mockCallHandler.handle = jest
            .fn()
            .mockReturnValue(throwError(() => error));
        interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
            error: (err) => {
                expect(err).toBe(error);
                expect(Logger.prototype.error).toHaveBeenCalledWith(
                    '[GET] /test - Error: Test error'
                );
                done();
            },
        });
    });
});
