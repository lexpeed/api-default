import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ActivityTypeEnum {
  essay = 'essay',
  multipleChoice = 'multiple-choice',
  singleChoice = 'single-choice',
}
export class Options {
  statement: string;

  isCorrect: boolean;
}

@Schema({ collection: 'activities', timestamps: true })
export class ActivityEntity extends Document {
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
    default: ActivityTypeEnum.essay,
    required: true,
  })
  type: ActivityTypeEnum;

  @Prop({ type: Boolean, default: true, required: true })
  active: boolean;
}

export type ActivityDocument = ActivityEntity & Document;

export const ActivitySchema = SchemaFactory.createForClass(ActivityEntity);

ActivitySchema.index({ id: 1 }, { unique: true });
