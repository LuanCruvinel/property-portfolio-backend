import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column({name: 'phone_number' })
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  city: string;


}