import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Hero } from 'src/typeorm/entities/Hero';
import { Movie } from 'src/typeorm/entities/Movie';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserHeroParams,
  CreateUserMovieParams,
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams
} from 'src/utils/types';
import { In, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(Hero) private heroRepository: Repository<Hero>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('audio') private audioQueue: Queue
  ) {}
  async findUsers() {
    let users: User[] = await this.cacheManager.get('typeorm:users');
    if(!users?.length){
      users = await this.userRepository.find({ relations: ['profile', 'posts'] });
      await this.cacheManager.set('typeorm:users', users, 20000);
    }
    return users;
  }
  async findUser(id: number) {
    let user: User = await this.cacheManager.get('typeorm:user');
    if(!user){
      user = await this.userRepository.findOneBy({ id });
      await this.cacheManager.set('typeorm:user', user, 1000);
    }
    return user;
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    this.userRepository.save(newUser);
  }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }

  async createUserHero(createUserHeroDetails: CreateUserHeroParams) {
    const newHero = this.heroRepository.create({
      ...createUserHeroDetails,
    });
    return this.heroRepository.save(newHero);
  }

  async createUserMovie(
    heroIds: Array<number>,
    createUserMovieDetails: CreateUserMovieParams,
  ) {
    const heroes = await this.heroRepository.findBy({ id: In(heroIds) });
    if (!heroes && !heroes.length) {
      throw new HttpException('hero not found', HttpStatus.BAD_REQUEST);
    }
    const newMovie = this.movieRepository.create({
      ...createUserMovieDetails,
    });
    newMovie.heroes = heroes;
    return this.movieRepository.save(newMovie);
  }
  findMovies() {
    // no need to add relation as eager loading is enabled in the movie schema
    // eager can be enabled one side only either on movies or heroes schema
    // if eager enabled in movie then it will reflect in the heroes like heroes -> movies -> heroes, so heroes will be repeated
    return this.movieRepository.find();
  }
  findHeroes() {
    // return this.heroRepository.find({
    //   select: {
    //     name: true,
    //   },
    //   where: {
    //     name: 'hero one',
    //   },
    //   relations: ['movies'],
    // });

    // using SELECT,OR, RELATIONS, ORDER, WITHDELETED SKIP, TAKE, CACHE methods.
    //skip and take doesnot work if we do not select id, relations is dependent on the id in select paramenter

    return this.heroRepository.find({
      select: {
        id: true,
        name: true,
      },
      relations: { movies: true },
      where: [{ name: 'hero one' }, { name: 'hero two' }],
      order: {
        name: 'DESC',
        id: 'ASC',
      },
      skip: 1,
      take: 1,
      cache: true,
      withDeleted: true,
    });
  }
}
