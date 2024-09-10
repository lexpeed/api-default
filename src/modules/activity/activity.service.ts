import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ActivityDocument, ActivityEntity } from './schemas/activity.schema';

@Injectable({ scope: Scope.TRANSIENT })
export class ActivityService {
  constructor(
    @InjectModel(ActivityEntity.name)
    private readonly ActivityModel: Model<ActivityDocument>,
  ) {}

  async findAll({ search }: { search: string }): Promise<any> {
    const filter: Record<string, any> = {
      active: true,
    };

    if (search) {
      filter.$text = { $search: search, $caseSensitive: false };
    }

    const result = await this.ActivityModel.find(filter).limit(12).lean();

    return result;
  }
}
