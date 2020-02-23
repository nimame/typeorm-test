import {Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Profile} from './Profile';
import {Group} from './Group';
import {Post} from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'date'})
  created!: Date;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  name?: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @OneToOne(type => Profile)
  @JoinColumn()
  profile!: Profile;

  @ManyToMany(type => Group, group => group.members)
  groups!: Group[];

  @OneToMany(type => Post, post => post.user)
  posts!: Post[];

  setPassword(value: string) {
    this.password = value + 'md5';
  }
}
