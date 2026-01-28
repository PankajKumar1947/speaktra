import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleEntity } from './entities/article.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleEntity }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
