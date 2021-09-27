import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './entities/food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

const mockFoodsService = {
  findAll: (search: string, skip?: number, take?: number) => {
    return;
  },
  findOne: (id: number) => {
    return;
  },
  create: () => {
    return;
  },
  update: () => {
    return;
  },
  remove: () => {
    return;
  },
};

describe('FoodsController', () => {
  let controller: FoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodsController],
      providers: [
        FoodsService,
        { provide: getRepositoryToken(Food), useClass: mockRepository },
        { provide: FoodsService, useValue: mockFoodsService },
      ],
    }).compile();

    controller = module.get<FoodsController>(FoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call foodsService.create', () => {
    const foodsServiceSpy = jest.spyOn(mockFoodsService, 'create');
    const foodDto = new CreateFoodDto();
    controller.create(foodDto);
    expect(foodsServiceSpy).toBeCalledWith(foodDto);
    expect(foodsServiceSpy).toBeCalledTimes(1);
  });

  it('should call foodsService.findAll', () => {
    const foodsServiceSpy = jest.spyOn(mockFoodsService, 'findAll');
    const search = 'muffin';
    const page = 2;
    const limit = 3;
    controller.findAll(search, page, limit);
    expect(foodsServiceSpy).toBeCalledWith(search, (page - 1) * limit, limit);
    expect(foodsServiceSpy).toBeCalledTimes(1);
  });

  it('should call foodsService.findOne', () => {
    const foodsServiceSpy = jest.spyOn(mockFoodsService, 'findOne');
    const foodId = 1;
    controller.findOne(foodId);
    expect(foodsServiceSpy).toBeCalledWith(foodId);
    expect(foodsServiceSpy).toBeCalledTimes(1);
  });

  it('should call foodsService.update', () => {
    const foodsServiceUpdateSpy = jest.spyOn(mockFoodsService, 'update');
    const foodsServiceFindOneSpy = jest.spyOn(mockFoodsService, 'findOne');
    const foodId = 1;
    const foodDto = new CreateFoodDto();
    controller.update(foodId, foodDto);
    expect(foodsServiceUpdateSpy).toBeCalledWith(foodId, foodDto);
    expect(foodsServiceUpdateSpy).toBeCalledTimes(1);
    expect(foodsServiceFindOneSpy).toBeCalledWith(foodId);
    expect(foodsServiceFindOneSpy).toBeCalledTimes(1);
  });

  it('should call foodsService.remove', () => {
    const foodsServiceRemoveSpy = jest.spyOn(mockFoodsService, 'remove');
    const foodId = 5;
    controller.remove(foodId);
    expect(foodsServiceRemoveSpy).toBeCalledWith(foodId);
    expect(foodsServiceRemoveSpy).toBeCalledTimes(1);
  });
});
