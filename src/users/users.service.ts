import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './user.dto'
import { UserRepository } from './user.repository'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const passwordHashingSaltOrRounds = 10;

@Injectable()
export class UsersService {

    constructor(private userRepository: UserRepository){}

    async findByEmail(email: string): Promise<User|null> {
        return await this.userRepository.findByEmail(email)
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, passwordHashingSaltOrRounds)
        return await this.userRepository.create(createUserDto)
    }
}
