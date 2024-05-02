import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateScheduleDto } from './dto/createScheduleDto';
import { ScheduleService } from './schedule.service';
import { ResponsSchedules } from './interface/ResponseSchedules.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('schedule')
@UseGuards(JwtAuthGuard)
export class ScheduleController {

    constructor(private scheduleService:ScheduleService){}

    @Get()
    async getAll():Promise<ResponsSchedules>{
        return this.scheduleService.getAll()
    }

    @Post()
    async create(@Body() createScheduleDto:CreateScheduleDto){
        return this.scheduleService.createSchedule(createScheduleDto)
    }
}
