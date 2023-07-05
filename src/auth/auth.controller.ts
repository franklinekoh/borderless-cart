import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UserResponseDto } from '../users/user.dto';
import { User } from '@prisma/client';
import { respondErrorWithMessage, respondSuccessWithMessageAndData } from '../util/httpResponse.util';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }

    @Post('/register')
   async register(@Body() createUserDto: CreateUserDto)  {
        const response: UserResponseDto = await this.authService.signUp(createUserDto)
        if(!response.status){
            return respondErrorWithMessage(response.message)
        }
        return respondSuccessWithMessageAndData('User Create', response.data)
   }

    @Post('/login')
   async login(@Body() LoginUserDto: LoginUserDto) {
        const response: UserResponseDto = await this.authService.signIn(LoginUserDto)
        
        if(!response.status){
            return respondErrorWithMessage(response.message)
        }

        return respondSuccessWithMessageAndData(response.message, response.data)
   }
}
