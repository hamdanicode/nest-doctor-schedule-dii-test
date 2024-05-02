import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }
    
    async login(user: any) {
        return {
            access_token: this.jwtService.sign(user)
        };

    }

    async validateUser(usernameOrEmail: string, password: string) {
        const user = await this.userService.getByUsernameOrEmail(usernameOrEmail)
        if (user && await user.validatePassword(password)) {
            const { password, salt, ...result } = user
            return result
        }
        return null;
    }
}
