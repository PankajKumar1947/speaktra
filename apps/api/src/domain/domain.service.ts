import { Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Domain } from './entities/domain.entity';
import { Model } from 'mongoose';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel(Domain.name) private readonly domainModel: Model<Domain>,
  ) {}

  create(createDomainDto: CreateDomainDto) {
    return this.domainModel.create(createDomainDto);
  }

  findAll() {
    return this.domainModel.find();
  }

  findOne(id: string) {
    return this.domainModel.findById(id).exec();
  }

  update(id: string, updateDomainDto: UpdateDomainDto) {
    return this.domainModel.findByIdAndUpdate(id, updateDomainDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.domainModel.findByIdAndDelete(id);
  }
}
