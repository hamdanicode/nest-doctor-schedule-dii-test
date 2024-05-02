import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entity/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/createScheduleDto';
import { EnumIdDay } from './enums/daty.enum';
import { DoctorsService } from 'src/doctors/doctors.service';
import { BodySchedule, ResponsSchedules } from './interface/ResponseSchedules.interface';

@Injectable()
export class ScheduleService {
    constructor(@InjectRepository(Schedule) private readonly scheduleRepository: Repository<Schedule>,
        private doctorService: DoctorsService
    ) { }

    async getAll():Promise<ResponsSchedules>{
        const data= await this.scheduleRepository.find();
        return {
            message:"success",
            body: await this.formatBodyResponse(data)
        }
    }

    private async formatBodyResponse(data:Schedule[]):Promise<BodySchedule[]>{
        const result =await data.map((el:Schedule)=>{
            const body:BodySchedule={
                day:el.day,
                date:el.date,
                quota:el.quota,
                doctor_id:el.doctor.id,
                doctor_name:el.doctor.name,
                id:el.id,
                status:el.status,
                time_finish:el.time_finish,
                time_start:el.time_start,
            }
            return body
        })
        return result
    }

    async createSchedule(createScheduleDto: CreateScheduleDto) {
        const { day, date_range_finish, date_range_start, quota, status, doctor_id, time_start, time_finish } = createScheduleDto
        const doctor = await this.doctorService.getDoctor(doctor_id);

        const dates = this.findDatesInRange(new Date(date_range_start), new Date(date_range_finish), day)
        const schedules = dates.map((dt) => {
            const a = new Schedule()
            a.day = day
            a.time_start = time_start
            a.time_finish = time_finish
            a.quota = quota
            a.status = status
            a.date = dt
            a.doctor = doctor
            return a
        })
        const inserted = await this.scheduleRepository.insert(schedules)
    }
    private findDatesInRange(startDate: Date, endDate: Date, day: string) {
        const dates = []
        for (var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            if (EnumIdDay[day] === currentDate.getDay()) {
                dates.push(currentDate.toISOString())
            }
        }
        return dates
    }
}
