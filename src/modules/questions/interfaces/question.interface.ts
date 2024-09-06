import { QuestionTypesEnum } from '../schemas/questions.schema';

export interface Options {
  statement: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title?: string;
  description?: string;
  statement: string;
  options?: Options[];
  type: QuestionTypesEnum;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}
