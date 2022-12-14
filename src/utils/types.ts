export type CreateUserType = {
  username: string;
  email: string;
};
export type CreateUserParams = {
  username: string;
  password: string;
};
export type UpdateUserParams = {
  username: string;
  password: string;
};
export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};
export type CreateUserPostParams = {
  title: string;
  description: string;
};
export type CreateUserHeroParams = {
  name: string;
};
export type CreateUserMovieParams = {
  name: string;
};
