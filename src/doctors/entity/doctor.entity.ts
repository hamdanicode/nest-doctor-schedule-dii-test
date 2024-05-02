import { Schedule } from "src/schedule/entity/schedule.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('doctors')
export class Doctor extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    name:string

    @Column()
    address:string

    @OneToMany(() => Schedule, schedule => schedule.doctor)
    schedules: Schedule[];

}