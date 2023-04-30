import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager())
    }

    async signUp(userDto: UserDto): Promise<string> {
        const { name, email, password } = userDto
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = this.create({
            name, 
            email,
            password: hashedPassword
        })
        try {
            await this.save(user)
            return 'user signed up'
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException('Username already exists')
            }else{
                throw new InternalServerErrorException()
            }
        }
    }

    async getUser(_id:number): Promise<User[]>{
        return await this.find({
            select: ['name','email'],
            where: [{'id': _id}]
        })
    }
}