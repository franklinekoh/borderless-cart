import { IsStrongPassword, IsNotEmpty, IsEmail } from "class-validator"
import { User } from "@prisma/client"

export class CreateUserDto{
    @IsNotEmpty()
    first_name: string

    @IsNotEmpty()
    last_name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string  
}

export class LoginUserDto{

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}

export class UserResponseDto{
    constructor(public status: boolean, public message: string, public data: any|null = null){}
}