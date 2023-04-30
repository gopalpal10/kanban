import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './users.repository';
import { UserDto } from './dto/user.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt  from 'bcrypt'
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        private userRepository : UserRepository,
        private jwtService : JwtService
    ){}

   async signUp(userDto: UserDto): Promise<string>{
    return await this.userRepository.signUp(userDto);
   }

   async getUser(id:number): Promise<User[]>{
    return this.userRepository.getUser(id)
   }

   async signIn(signinDto: SignInDto): Promise<{accessToken: string}> {
        const{email ,password} = signinDto
        const user = await this.userRepository.findOne({where: {email}})

        if(user && (await bcrypt.compare(password,user.password))) {
            const payload: JwtPayload = {email}
            const accessToken: string = await this.jwtService.sign(payload)
            return {accessToken}
        }else{
             throw new UnauthorizedException(`Please checkyour login credentials`)
        }
   }
}


