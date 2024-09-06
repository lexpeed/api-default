import { instanceToInstance, plainToClass } from 'class-transformer';
import { IsDateString } from 'class-validator';

import { CreateDto } from './create.dto';

export class GetDto extends CreateDto {
  id: string;

  @IsDateString()
  createdAt?: string;

  @IsDateString()
  updatedAt?: string;

  public static factory(resultQuery: GetDto | GetDto[]): GetDto | GetDto[] {
    const resultQueryDto = plainToClass(GetDto, resultQuery, {
      excludePrefixes: ['_id', '__v'],
    });

    return instanceToInstance(resultQueryDto);
  }
}
