export type User = {
  name: string;
  email: string;
  handle: string;
  _id: string;
  description: string;
};

export type RegisterForm = Pick<User, "email" | "handle" | "name"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type ProfileForm = Pick<User, "handle" | "description">;
