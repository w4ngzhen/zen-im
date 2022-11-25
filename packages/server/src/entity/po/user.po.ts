import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('user')
export class UserPo {
    /**
     * 没有业务逻辑含义的全局唯一ID
     */
    @PrimaryColumn({
        name: 'id'
    })
    id: string;
    /**
     * 用户名
     */
    @Column({
        name: 'username'
    })
    username: string;
    /**
     * 用户密码（SHA256摘要）
     */
    @Column({
        name: 'password'
    })
    password: string;
    /**
     * 创建时间
     */
    @Column({name: 'create_time'})
    createTime: string;
}
