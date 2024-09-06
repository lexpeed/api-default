import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsString,
  IsEnum,
} from 'class-validator';

import { Question } from '../interfaces/question.interface';
import { QuestionTypesEnum } from '../schemas/questions.schema';

export class QuestionOptionsDto {
  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}

export class CreateDto implements Partial<Question> {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionsDto)
  options?: QuestionOptionsDto[];

  @IsEnum(QuestionTypesEnum, { each: true })
  @IsString()
  @IsNotEmpty()
  type: QuestionTypesEnum;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
