import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDto, LoginUserDto } from '../users/user.dto'
import { User } from '@prisma/client'
import { UserResponseDto } from '../users/user.dto'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from './auth.config'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async signIn(logingUserDto: LoginUserDto): Promise<any> {
        const user: User|null = await this.usersService.findByEmail(logingUserDto.email)
        if(!user){
            return new UserResponseDto(false, 'Incorrect login credentials.')
        }

        const isPasswordMatch = await bcrypt.compare(logingUserDto.password, user.password)
        if(isPasswordMatch){
            // generate jwt crendentials
            const jwtPayload = {email: user.email, phone: user.phone}
            return new UserResponseDto(true, 'Login Successful', {
                access_token: await this.jwtService.signAsync(jwtPayload),
                expires: JwtConfig.expires
            })
        }

        return new UserResponseDto(false, 'Incorrect login credentials.')

    }

    async signUp(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        try{
            const userExists: User|null = await this.usersService.findByEmail(createUserDto.email)
            if(userExists){
                return new UserResponseDto(false, 'Email already exists')
            }
            const user: User = await this.usersService.create(createUserDto)
            return new UserResponseDto(true, 'User created', user)
        }catch(e){
            return new UserResponseDto(false, e.message)
        }
    }
}
