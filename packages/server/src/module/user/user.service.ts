import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserPo} from "../../entity/po/user.po";
import {Repository} from "typeorm";
import {UserDto} from "../../entity/dto/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserPo) private userRepo: Repository<UserPo>) {

    }

    async getUserById(id: string) {
        const userPo = await this.userRepo.findOneBy({id: id});
        if (!userPo) {
            return null;
        }
        const userDto: UserDto = {
            ...userPo
        }
        return userDto;
    }
}
