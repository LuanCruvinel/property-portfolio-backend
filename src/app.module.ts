import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { PropertyModule } from './property/property.module';
import { User } from 'src/user/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
import { Property } from 'src/property/entities/property.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'admin',
      password: 'password',
      database: 'nest_project',
      autoLoadEntities: true,
      entities: [User,Client, Property],
      migrations: ['./database/migrations'],
    }),
    UserModule,
    ClientModule,
    PropertyModule,
  ],
})
export class AppModule {}
