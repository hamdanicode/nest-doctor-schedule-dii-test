import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/createDoctorDto';
import { UpdateDoctorDto } from './dto/updateDoctorDto';

@Controller('doctors')
export class DoctorsController {

    constructor(private doctorService:DoctorsService){}
    @Get()
    async getAll(){
        return this.doctorService.getDoctors()
    }
    
    @Get(':id')
    async getOne(@Param('id') id:number){
        return this.doctorService.getDoctor(id)
    }

    @Post()
    async create(@Body() createDoctorDto:CreateDoctorDto){
       return this.doctorService.createDoctor(createDoctorDto);
    }

    @Put(':id')
    async update(id:number,@Body() updateDoctorDto:UpdateDoctorDto){
       return this.doctorService.updateDoctor(id,updateDoctorDto);
    }

    @Delete(':id')
    async remove(@Param('id') id:number){
        return this.doctorService.deleteDoctor(id)
    }
}
