import { Doctor } from "src/doctors/entity/doctor.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedule')
export class Schedule extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    day:string

    @Column()
    time_start:string
    
    @Column()
    time_finish:string
   
    @Column()
    quota:number
    
    @Column()
    status:boolean
    
    @Column()
    date:Date

    @ManyToOne(() => Doctor, (doctor) => doctor.schedules,{eager:true})
    doctor: Doctor


    
}