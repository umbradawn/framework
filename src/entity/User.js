import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id;

  @Column('varchar') firstName = '';

  @Column('varchar') lastName = '';

  @Column('boolean') isActive;
}
