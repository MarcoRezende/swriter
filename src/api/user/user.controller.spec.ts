import { Test, TestingModule } from '@nestjs/testing';

import { UserAppController } from './user.app.controller';

describe('UserAppController', () => {
  let controller: UserAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAppController],
    }).compile();

    controller = module.get<UserAppController>(UserAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
