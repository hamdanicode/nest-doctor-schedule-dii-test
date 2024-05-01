import { Module } from '@nestjs/common';
import { DoctorsModule } from './doctors/doctors.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(typeOrmConfig)
    ,DoctorsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
