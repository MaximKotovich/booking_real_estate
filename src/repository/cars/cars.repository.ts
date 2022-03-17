import { EntityRepository, Repository } from 'typeorm';
import { CarsEntity } from '../../common/entity/cars-entity';

@EntityRepository(CarsEntity)
export class CarsRepository extends Repository<CarsEntity> {}
