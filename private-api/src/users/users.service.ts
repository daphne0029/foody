import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(skip = 0, take = 25) {
    return this.usersRepository.find({
      skip,
      take,
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail(id);
  }

  getMostConsumedNutrient(id: number): Promise<User> {
    return createQueryBuilder()
      .select('fn.nutrient_id', 'id')
      .addSelect('n.name', 'name')
      .addSelect('n.unitName', 'unitName')
      .addSelect('fn.amount_per_serving * uf.servings_per_week', 'weeklyAmount')
      .from(User, 'user')
      .innerJoin('user.userFoods', 'uf', 'uf.userId = user.id')
      .innerJoin('uf.food', 'f', 'f.id = uf.foodId')
      .innerJoin('f.foodNutrients', 'fn', 'fn.foodId = f.id')
      .innerJoin('fn.nutrient', 'n', 'n.id = fn.nutrientId')
      .where('user.id = :id', { id: id.toString() })
      .orderBy('weeklyAmount', 'DESC')
      .getRawOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ id }, updateUserDto);
    return this.usersRepository.findOneOrFail(id);
  }

  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
