import { IsNotEmpty, MaxLength } from "class-validator";


export class LoginDto{
    @IsNotEmpty()
    @MaxLength(255)
    username:string
    @IsNotEmpty()
    @MaxLength(60)
    password:string
}