import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from '../interfaces/question.interface';

export enum QuestionTypesEnum {
  essay = 'essay',
  multipleChoice = 'multiple-choice',
  singleChoice = 'single-choice',
}
export class Options {
  statement: string;

  isCorrect: boolean;
}

@Schema({ collection: 'questions', timestamps: true })
export class QuestionsEntity extends Document implements Question {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: false })
  title?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: String, required: true })
  statement: string;

  @Prop({ type: Array, required: false })
  options?: Options[];

  @Prop({
    // type: QuestionTypesEnum,
    // enum: Object.values(QuestionTypesEnum),
    type: String,
    default: QuestionTypesEnum.essay,
    required: true,
  })
  type: QuestionTypesEnum;

  @Prop({ type: Boolean, default: true, required: true })
  active: boolean;
}

export type QuestionsDocument = QuestionsEntity & Document;

export const QuestionsSchema = SchemaFactory.createForClass(QuestionsEntity);

QuestionsSchema.index({ id: 1 }, { unique: true }).index({
  statement: 'text',
  title: 'text',
  description: 'text',
  'options.statement': 'text',
});
