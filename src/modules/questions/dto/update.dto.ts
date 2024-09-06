import { IsOptional, IsString } from 'class-validator';
import { QuestionTypesEnum } from '../schemas/questions.schema';

import { CreateDto } from './create.dto';

export class UpdateDto extends CreateDto {
  @IsString()
  @IsOptional()
  statement: string;

  @IsString()
  @IsOptional()
  type: QuestionTypesEnum;
}
