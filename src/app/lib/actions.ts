'use server';

import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { string, z } from "zod";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { SignUpState } from './definitions';
// ...

const FormSchema = z.object({
  id: z.number(),
  username: z.string().min(5, {message: 'Username must be 5+ characters.'}),
  email: z.string().email({
    message: 'Please type a valid email',
  }),
  password: z.string().min(6, {message: 'Password must be 6+ characters.'}),
  confirmPassword: z.string(),
  userProfileUrl: z.string().nullable()
});

const SignUpUser = FormSchema.omit({id: true, confirmPassword: true});

export async function signUp( prevState: SignUpState, formData: FormData ) {

  const validatedFields = SignUpUser.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    userProfileUrl: formData.get('userProfileUrl')
  });

  const state = {errors: {}, message: ''};

  if (!validatedFields.success) {
    state.errors = validatedFields.error.flatten().fieldErrors;
    state.message = 'Missing Fields. Failed to Sign Up.';
  }

  const passwordsMatch =
    String(formData.get('password')) === String(formData.get('confirmPassword'));
  if (!passwordsMatch) {
    state.errors = {
      ...state.errors,
      confirmPassword: ["Passwords don't match."],
    }
    state.message = 'Missing Fields. Failed to Sign Up.';
  }

  if (!passwordsMatch || !validatedFields.success) return state;

  const {username, email, password, userProfileUrl} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
    INSERT INTO users (username, email, hashedpassword, userprofileurl)
    VALUES (${username}, ${email}, ${hashedPassword}, ${userProfileUrl})
    `
  } catch (error) {
    console.error(error)
    return {
      message: 'Database Error: Failed to sign up.',
    };
  }

  // sign in the user after account creation
  await signIn("credentials", { username, password, redirect: false })
  // then redirect them to '/home';
  redirect('/home');

  return {errors: {}, message: null};
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
