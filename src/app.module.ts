import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { PropertyModule } from './property/property.module';

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
      synchronize: true,
    }),
    UserModule,
    ClientModule,
    PropertyModule,
  ],
})
export class AppModule {}
