import { Controller, Get, Query } from '@nestjs/common';

import { ActivityService } from './activity.service';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async findAll(@Query() filterPaginateDto: any): Promise<any> {
    const { search } = filterPaginateDto;

    const resultQuery = await this.activityService.findAll({
      search,
    });

    return { data: resultQuery };
  }
}
