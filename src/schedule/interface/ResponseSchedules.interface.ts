
export interface BodySchedule{
    id:number
    doctor_id:number
    doctor_name:string
    day:string
    time_start:string
    time_finish:string
    quota:number
    status:boolean
    date:Date
}


export interface ResponsSchedules{
    message:string
    body:BodySchedule[]
}