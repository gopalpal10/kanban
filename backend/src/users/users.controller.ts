import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import {SignInDto } from './dto/signin.dto';
import { retry } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    //get user using id 
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.getUser(id);
    }

    //user sign up route return :- message
    @Post('signup')
    signUp(@Body() userDto:UserDto): Promise<string>{
        return this.usersService.signUp(userDto);
    }
    
    //user sign in route return :- token
    @Post('login')
    signIn(@Body() signinDto: SignInDto): Promise< {accessToken :string}> {
        return this.usersService.signIn(signinDto);
    }
}
