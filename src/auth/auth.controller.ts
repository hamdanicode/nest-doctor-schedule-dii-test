import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}
    
    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req){
        return this.authService.login(req.user)
    }
    
}
