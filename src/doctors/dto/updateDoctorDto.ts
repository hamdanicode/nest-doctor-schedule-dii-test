import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class UpdateDoctorDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name:string
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    address:string
}