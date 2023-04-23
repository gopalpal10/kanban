import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./users.repository";
import { User } from "./user.entity";
import { UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository : UserRepository
    ){
        super({
            secretOrKey: 'kanbansecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {email} = payload;
        const user: User = await this.userRepository.findOne({where:{email}})

        if(!user){
          throw new UnauthorizedException();
        }
        
        return user;
    }
}