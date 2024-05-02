import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}
    @Get()
    async getAll(){
        return this.usersService.getUsers()
    }
    
    @Get(':id')
    async getOne(@Param('id') id:number){
        return this.usersService.getUser(id)
    }

    @Post()
    async create(@Body() CreateUserDto:CreateUserDto){
        return this.usersService.createUser(CreateUserDto)
    }

    @Delete(':id')
    async remove(@Param('id') id:number){
        return this.usersService.deleteUser(id)
    }
}
