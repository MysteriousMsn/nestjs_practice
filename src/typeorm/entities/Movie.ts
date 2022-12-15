import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Hero } from './Hero';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Hero, (hero) => hero.movies, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  heroes: Hero[];
}
