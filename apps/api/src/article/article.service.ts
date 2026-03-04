import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './entities/article.entity';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<Article>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return this.articleModel.create(createArticleDto);
  }

  createMany(createArticleDto: CreateArticleDto[]) {
    return this.articleModel.insertMany(createArticleDto);
  }

  findAll() {
    return this.articleModel.find().exec();
  }

  findOne(id: string) {
    return this.articleModel.findById(id).exec();
  }

  findByDomain(domainId: string) {
    return this.articleModel.find({ domainId }).exec();
  }

  findByType(type: string) {
    return this.articleModel.find({ type }).exec();
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.articleModel.findByIdAndDelete(id);
  }
}
