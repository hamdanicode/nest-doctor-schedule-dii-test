import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('doctors')
export class Doctor extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    name:string

    @Column()
    address:string

}