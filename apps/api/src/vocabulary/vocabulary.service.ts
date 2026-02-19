import { Injectable } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vocabulary } from './entities/vocabulary.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class VocabularyService {
  constructor(
    @InjectModel(Vocabulary.name)
    private readonly vocabularyModel: Model<Vocabulary>,
  ) {}

  create(createVocabularyDto: CreateVocabularyDto) {
    return this.vocabularyModel.create(createVocabularyDto);
  }

  findAll() {
    return this.vocabularyModel.find().exec();
  }

  findOne(id: string) {
    return this.vocabularyModel.findById(id).exec();
  }

  findByDomain(domainId: string) {
    return this.vocabularyModel.find({ domainId }).exec();
  }

  update(id: string, updateVocabularyDto: UpdateVocabularyDto) {
    return this.vocabularyModel.findByIdAndUpdate(id, updateVocabularyDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.vocabularyModel.findByIdAndDelete(id);
  }

  async getLastNVocabularies(count: number, domainId: mongoose.Types.ObjectId) {
    const vocabularies = await this.vocabularyModel
      .find({ domainId })
      .sort({ createdAt: -1 })
      .limit(count)
      .select('word');
    return vocabularies.map((v) => v.word);
  }
}
