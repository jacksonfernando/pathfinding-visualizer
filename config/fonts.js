import { Lato, Rubik } from 'next/font/google'

export const rubikFont = Rubik({
  subsets: ['hebrew'],
  weight: ['400'],
  variable: '--font-rubik'
});

export const latoFont = Lato({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lato'
});

