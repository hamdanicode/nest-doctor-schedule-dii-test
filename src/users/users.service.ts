import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

    async getByUsernameOrEmail(usernameOrEmail:string):Promise<User>{
        return await this.userRepository.findOne({where:[{
            username:usernameOrEmail},
           {email:usernameOrEmail}]
        })
    }

    async getUsers(){
        return await this.userRepository.find({
            select: {
                username: true,
                email: true,
                id: true,
            },
        })
    }
    async getUser(id:number){
        const user= await this.userRepository.findOneBy({id:id})
        if(!user) throw new HttpException("user not found",HttpStatus.NOT_FOUND)
        const {password:pas,salt,...result}=user
        return result
    }
    async createUser(createUserDto:CreateUserDto){
        try {
            const {email,username,password}=createUserDto
            const userCreate = this.userRepository.create()
            userCreate.email=email
            userCreate.username=username
            userCreate.salt=await bcrypt.genSalt()
            userCreate.password=await bcrypt.hash(password,userCreate.salt)
            await userCreate.save()
            const {password:pas,salt,...result}=userCreate
            return result
        } catch (error) {
            // 23505
            if (error.code === '23505') {
                if (error.detail.indexOf('username')>0) {
                    throw new ConflictException('Username already used.')
                }
                throw new ConflictException('Email already used.')
            }
        }        
    }
    async deleteUser(id:number){
        const user= await this.userRepository.findOneBy({id:id})
        if(!user) throw new HttpException("user not found",HttpStatus.NOT_FOUND)
        await user.remove()
    }
}
