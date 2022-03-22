import { EntityRepository, Repository } from 'typeorm';
import { CarPhotosEntity } from '../../common/entity/car-photos-entity';

@EntityRepository(CarPhotosEntity)
export class CarPhotoRepository extends Repository<CarPhotosEntity> {}
