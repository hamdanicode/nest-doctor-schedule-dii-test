import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entity/schedule.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports:[TypeOrmModule.forFeature([Schedule]),DoctorsModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
