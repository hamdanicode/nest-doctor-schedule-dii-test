import { IsBoolean, IsDateString, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { EnumIdDay } from "../enums/daty.enum"


export class CreateScheduleDto{
    
    @IsNotEmpty()
    @IsString()
    @IsEnum(EnumIdDay,{message:"day must be one of the following values: minggu, senin, selasa, rabu, kamis, jumat, sabtu"})
    day:string
    
    @IsNotEmpty()
    @IsString()
    time_start:string
    
    @IsNotEmpty()
    @IsString()
    time_finish:string
   
    @IsNotEmpty()
    @IsNumber()
    quota:number
    
    @IsNotEmpty()
    @IsBoolean()
    status:boolean
    
    @IsDateString()
    @IsNotEmpty()
    date_range_start:Date
    
    @IsDateString()
    @IsNotEmpty()
    date_range_finish:Date

    @IsNotEmpty()
    @IsNumber()
    doctor_id:number

}