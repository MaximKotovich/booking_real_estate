import { EntityRepository, Repository } from 'typeorm';
import { CarsEntity } from '../../common/entity/cars-entity';

@EntityRepository(CarsEntity)
export class CarsRepository extends Repository<CarsEntity> {
  // async carById(userId: number) {
  //   return await this.query(`
  //           SELECT * from cars
  //           where cars."ownerId" = ${userId}
  //           `);
  // }
}
