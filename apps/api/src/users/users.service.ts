import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find().select('-password').populate('domain');
  }

  findOne(id: string) {
    return this.userModel.findById(id).select('-password').populate('domain');
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .populate('domain');
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  completeOnboarding(userId: string, onboardingData: CompleteOnboardingDto) {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          domain: onboardingData.domain,
          level: onboardingData.level,
          goals: onboardingData.goals,
          onboardingCompleted: true,
        },
        { new: true },
      )
      .select('-password')
      .populate('domain');
  }
}
