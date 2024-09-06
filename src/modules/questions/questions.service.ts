import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

import {
  QuestionsDocument,
  QuestionsEntity,
  QuestionTypesEnum,
} from './schemas/questions.schema';
import { Question } from './interfaces/question.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class QuestionsService {
  constructor(
    @InjectModel(QuestionsEntity.name)
    private questionsModel: Model<QuestionsDocument>,
  ) {}

  async create(data: Partial<Question>): Promise<any> {
    const dataToSave = new this.questionsModel({
      id: uuidV4(),
      ...data,
    });

    const { type, options } = dataToSave;

    if (type === QuestionTypesEnum.essay && options?.length) {
      throw new HttpException(
        'Essay question must not have statements.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      type === QuestionTypesEnum.multipleChoice &&
      (!options || options.length < 2)
    ) {
      throw new HttpException(
        'Multiple-choice question must have more than 2 statements.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      type === QuestionTypesEnum.singleChoice &&
      (!options || options.length < 2)
    ) {
      throw new HttpException(
        'Single-choice question must have more than 2 statements.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (type !== QuestionTypesEnum.essay) {
      let count = 0;
      for (let i = 0; i < options.length; i++) {
        if (options[i].isCorrect === true) {
          count++;
        }
      }

      if (count < 1) {
        throw new HttpException(
          'An question must have at least 1 correct answer.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (type === QuestionTypesEnum.singleChoice && count > 1) {
        throw new HttpException(
          'This type of question must have 1 correct answer.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const dataSaved = await dataToSave.save();
    return dataSaved.toJSON();
  }

  async findAll({
    page,
    pageSize,
    orderBy,
    orderDirection,
    search,
  }: {
    page: number;
    pageSize: number;
    orderBy: string;
    orderDirection: string;
    search: string;
  }): Promise<[Question[], number]> {
    const filter: Record<string, any> = {
      active: true,
    };

    if (search) {
      filter.$text = { $search: search, $caseSensitive: false };
    }

    const sortBy: { [key: string]: SortOrder } = {
      [orderBy]: orderDirection === 'asc' ? 1 : -1,
    };
    const count = await this.questionsModel.countDocuments(filter);
    const result = await this.questionsModel
      .find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortBy)
      .lean();

    return [result, count];
  }

  async findOne(id: string): Promise<Question> {
    const data = await this.questionsModel.findOne({ id }).lean();

    if (!data) {
      throw new HttpException('Question not found.', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async update(id: string, data: any): Promise<Question> {
    if (!(await this.questionsModel.findOne({ id }).lean())) {
      throw new HttpException('Question not found.', HttpStatus.NOT_FOUND);
    }

    return this.questionsModel
      .findOneAndUpdate({ id }, data, {
        timestamps: true,
        new: true,
      })
      .lean();
  }

  async remove(id: string): Promise<void> {
    const data = await this.questionsModel.findOne({ id });

    if (!data) {
      throw new HttpException('Question not found.', HttpStatus.NOT_FOUND);
    }

    await this.questionsModel.deleteOne({ id });
  }
}
