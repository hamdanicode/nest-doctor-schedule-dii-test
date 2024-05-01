import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";


export class CreateDoctorDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name:string
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    address:string
}