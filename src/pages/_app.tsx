import type { AppProps } from 'next/app';
import '../styles/global.css';
import { ChallengesContext, ChallengesProvider } from '../context/ChallengesContext';
import { CountDownContextProvider } from '@/context/CountDownContext';


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}
