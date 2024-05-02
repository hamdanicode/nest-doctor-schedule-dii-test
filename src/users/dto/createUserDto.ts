import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, MinLength } from "class-validator";


export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    @MinLength(5)
    username:string
    
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @MaxLength(255)
    email:string  
    
    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(8)
    @IsString()
    password:string
}