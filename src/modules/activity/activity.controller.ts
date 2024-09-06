import { Body, Controller, Post, Req } from '@nestjs/common';

import { ActivityService } from './activity.service';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async create(@Body() data: any, @Req() req: any): Promise<any> {
    try {
      const dataCreated = await this.activityService.create(data);
      req.logger.log(`Activity id: ${dataCreated.id} created`);
      return dataCreated;
    } catch (error) {
      req.logger.error(error);
      throw error;
    }
  }
}
