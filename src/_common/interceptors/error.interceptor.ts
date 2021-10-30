import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof QueryFailedError) {
          switch ((<any>error).code) {
            case 'ER_DUP_ENTRY':
              throw new ConflictException();

            default:
          }
        } else if (error instanceof EntityNotFoundError) {
          throw new NotFoundException();
        }
        throw error;
      }),
    );
  }
}
