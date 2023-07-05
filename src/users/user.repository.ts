import { Injectable } from '@nestjs/common'
import { DBConnectionService } from "../db/connection.db"
import { CreateUserDto } from "./user.dto"
import { User } from '@prisma/client'


@Injectable()
export class UserRepository{
    constructor(private db: DBConnectionService) {}

    async create(dto: CreateUserDto): Promise<User>{
        return await this.db.user.create({
            data: dto
        })
    }

   async findByEmail(email: string): Promise<User|null> {
        return await this.db.user.findUnique({
            where: {
                email: email
            }
        });
   }
}