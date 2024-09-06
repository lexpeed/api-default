import { IsOptional } from 'class-validator';

import { RequestPaginateDto } from '../../../commons/dtos/request-paginate.dto';

export class FilterPaginateDto extends RequestPaginateDto {
  @IsOptional()
  search?: string;
}
