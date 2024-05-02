import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt"

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({unique:true})
    username:string
    
    @Column({unique:true})
    email:string

    @Column()
    salt:string
    
    @Column()
    password:string

    async validatePassword(password:string):Promise<boolean>{
        const hash= await bcrypt.hash(password,this.salt)
        return hash=== this.password;
    }

}