import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

import { ActivityDocument, ActivityEntity } from './schemas/activity.schema';

@Injectable({ scope: Scope.TRANSIENT })
export class ActivityService {
  constructor(
    @InjectModel(ActivityEntity.name)
    private readonly ActivityModel: Model<ActivityDocument>,
  ) {}

  async create(data: any): Promise<any> {
    const dataToSave = new this.ActivityModel({
      id: uuidV4(),
      ...data,
    });

    const dataSaved = await dataToSave.save();
    return dataSaved.toJSON();
  }
}
