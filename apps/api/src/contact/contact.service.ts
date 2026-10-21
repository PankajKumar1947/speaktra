import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactMessage } from './entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectModel(ContactMessage.name)
    private readonly contactMessageModel: Model<ContactMessage>,
  ) {}

  async create(createContactMessageDto: CreateContactMessageDto) {
    const contactMessage = await this.contactMessageModel.create(
      createContactMessageDto,
    );

    this.logger.log(
      `New contact message (${contactMessage.topic}) from ${contactMessage.email}`,
    );

    return contactMessage;
  }

  findAll() {
    return this.contactMessageModel.find().sort({ createdAt: -1 }).exec();
  }

  findOne(id: string) {
    return this.contactMessageModel.findById(id).exec();
  }

  update(id: string, updateContactMessageDto: UpdateContactMessageDto) {
    return this.contactMessageModel
      .findByIdAndUpdate(id, updateContactMessageDto, { new: true })
      .exec();
  }
}
