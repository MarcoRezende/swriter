import {
  applyDecorators,
  BadRequestException,
  Controller,
} from '@nestjs/common';
import type { CrudOptions } from '@nestjsx/crud';
import { Crud } from '@nestjsx/crud';

export const AdminController = (
  type: any,
  endpoint: string,
  crudOptions: Partial<CrudOptions> = {},
) => {
  const query = crudOptions.query ?? {};
  delete crudOptions.query;

  return applyDecorators(
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
        ...query,
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
    Controller(`admin/${endpoint}`),
  );
};
