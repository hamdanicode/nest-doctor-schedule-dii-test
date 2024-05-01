import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entity/doctor.entity';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/createDoctorDto';
import { UpdateDoctorDto } from './dto/updateDoctorDto';

@Injectable()
export class DoctorsService {
    constructor(@InjectRepository(Doctor) private readonly doctorRepository:Repository<Doctor>){}

    async getDoctors(){
        return await this.doctorRepository.find()
    }
    async getDoctor(id:number){
        const doctor= await this.doctorRepository.findOneBy({id:id})
        if(!doctor) throw new HttpException("doctor not found",HttpStatus.NOT_FOUND)
        return doctor
    }
    async createDoctor(createDoctorDto:CreateDoctorDto){
        try {
            const doctorCreated = this.doctorRepository.create(createDoctorDto)
            await doctorCreated.save()
            return doctorCreated
        } catch (error) {
            throw new HttpException("An unexpected error occurred while attempting to store the data.",HttpStatus.BAD_REQUEST)
        }        
    }
    async updateDoctor(id:number,updateDoctorDto:UpdateDoctorDto){
        const doctor=await this.doctorRepository.findOneBy({id:id})
        if(!doctor) throw new HttpException("doctor not found",HttpStatus.NOT_FOUND)
            try {
        const {name, address}=updateDoctorDto
            doctor.name=name
            doctor.address=address
            await doctor.save()
            return doctor
        } catch (error) {
            throw new HttpException("An unexpected error occurred while attempting to update the data.",HttpStatus.BAD_REQUEST)
        }
    }

    async deleteDoctor(id:number){
        const doctor= await this.doctorRepository.findOneBy({id:id})
        if(!doctor) throw new HttpException("doctor not found",HttpStatus.NOT_FOUND)
        await doctor.remove()
    }
}
