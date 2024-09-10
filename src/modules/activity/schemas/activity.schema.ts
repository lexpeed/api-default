import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'activities', timestamps: true })
export class ActivityEntity extends Document {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: false })
  title?: string;

  @Prop({ type: Array, required: false })
  tags?: any[];

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Array, required: true })
  questions: any[];

  @Prop({ type: Boolean, default: true, required: true })
  active: boolean;
}

export type ActivityDocument = ActivityEntity & Document;

export const ActivitySchema = SchemaFactory.createForClass(ActivityEntity);

ActivitySchema.index({ id: 1 }, { unique: true });
