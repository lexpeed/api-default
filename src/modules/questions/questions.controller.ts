import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';

import { CreateDto } from './dto/create.dto';
import { FilterPaginateDto } from './dto/filter-paginate.dto';
import { GetDto } from './dto/get.dto';
import { GetPaginateDto } from './dto/get-paginate.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() data: CreateDto, @Req() req: any): Promise<GetDto> {
    try {
      const dataCreated = await this.questionsService.create(data);
      req.logger.log(`Question id: ${dataCreated.id} created`);
      return GetDto.factory(dataCreated) as GetDto;
    } catch (error) {
      req.logger.error(error);
      throw error;
    }
  }

  @Get()
  async findAll(
    @Query(ValidationPipe) filterPaginateDto: FilterPaginateDto,
  ): Promise<GetPaginateDto> {
    const {
      page = 1,
      perPage = 20,
      orderBy = 'createdAt',
      orderDirection = 'asc',
      search,
    } = filterPaginateDto;

    const pageNumber = Number(page);
    const pageSize = Number(perPage);

    const [resultQuery, count] = await this.questionsService.findAll({
      page,
      pageSize,
      orderBy,
      orderDirection,
      search,
    });

    return new GetPaginateDto(resultQuery, count, pageNumber, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetDto> {
    return GetDto.factory(await this.questionsService.findOne(id)) as GetDto;
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() data: UpdateDto,
  //   @Req() req: any,
  // ): Promise<GetDto> {
  //   try {
  //     const dataUpdated = await this.questionsService.update(id, data);
  //     req.logger.log(`Question id: ${dataUpdated.id} updated`);
  //     return GetDto.factory(dataUpdated) as GetDto;
  //   } catch (error) {
  //     req.logger.error(error);
  //     throw error;
  //   }
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.questionsService.remove(id);
  // }
}
