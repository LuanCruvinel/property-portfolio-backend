import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column()
  type: string;
}
