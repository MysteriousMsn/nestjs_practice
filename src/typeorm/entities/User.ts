import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Post } from './Post';
import { Profile } from './Profile';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
