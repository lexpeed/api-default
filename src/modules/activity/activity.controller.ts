import { Controller, Get, Param, Query } from '@nestjs/common';

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

    return resultQuery;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.activityService.findOne(id);
  }
}
