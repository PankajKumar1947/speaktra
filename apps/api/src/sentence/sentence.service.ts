import { Injectable } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sentence } from './entities/sentence.entity';
import { Model } from 'mongoose';

@Injectable()
export class SentenceService {
  constructor(
    @InjectModel(Sentence.name)
    private readonly sentenceModel: Model<Sentence>,
  ) {}

  create(createSentenceDto: CreateSentenceDto) {
    return this.sentenceModel.create(createSentenceDto);
  }

  createMany(createSentenceDto: CreateSentenceDto[]) {
    return this.sentenceModel.insertMany(createSentenceDto);
  }

  findAll() {
    return this.sentenceModel.find().exec();
  }

  findOne(id: string) {
    return this.sentenceModel.findById(id).exec();
  }

  findByDomain(domainId: string) {
    return this.sentenceModel.find({ domainId }).exec();
  }

  update(id: string, updateSentenceDto: UpdateSentenceDto) {
    return this.sentenceModel.findByIdAndUpdate(id, updateSentenceDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.sentenceModel.findByIdAndDelete(id);
  }
}
