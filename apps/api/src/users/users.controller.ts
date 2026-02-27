import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@repo/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    console.log(req.user);
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  getMe(@Req() req: Request) {
    const userId = req.user?.sub as string;
    return this.usersService.findOne(userId);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  updateMe(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const userId = req.user?.sub as string;
    return this.usersService.update(userId, updateUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('onboarding/complete')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  completeOnboarding(
    @Body() completeOnboardingDto: CompleteOnboardingDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.sub as string;
    return this.usersService.completeOnboarding(userId, completeOnboardingDto);
  }
}
