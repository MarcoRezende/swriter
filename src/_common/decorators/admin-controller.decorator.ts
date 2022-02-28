import { AuthGuard } from '@api/auth/auth.guard';
import { RoleGuard } from '@api/auth/role.guard';
import { UserRole } from '@api/user/entities/user.entity';
import {
  applyDecorators,
  BadRequestException,
  Controller,
  UseGuards,
} from '@nestjs/common';
import type { CrudOptions } from '@nestjsx/crud';
import { Crud } from '@nestjsx/crud';

export const AdminController = (
  type: any,
  endpoint: string,
  crudOptions: Partial<CrudOptions> = {},
) =>
  applyDecorators(
    Crud({
      model: {
        type,
      },
      routes: {
        createOneBase: {},
        createManyBase: {},
        getOneBase: {},
        getManyBase: {},
        updateOneBase: {},
        deleteOneBase: {},
      },
      query: {
        alwaysPaginate: true,
        maxLimit: 50,
      },
      params: {
        id: {
          field: 'id',
          type: 'string',
          primary: true,
        },
      },
      ...crudOptions,
      validation: {
        exceptionFactory: errors => new BadRequestException(errors),
      },
    }),
    UseGuards(AuthGuard, new RoleGuard([UserRole.ADMIN])),
    Controller(`admin/${endpoint}`),
  );
