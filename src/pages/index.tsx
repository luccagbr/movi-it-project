import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from "../styles/pages/Home.module.css";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import Head from "next/head";
import { ChallengeBox } from "@/components/ChallengeBox";
import { CountDownContextProvider } from "@/context/CountDownContext";

export default function Home() {
  return (
    <div className = {styles.container}>
      <Head>
        <title>Início | Movi.it</title>
      </Head>

      <ExperienceBar />

      <CountDownContextProvider>
        <section>
          <div>
            <Profile />
            <CompleteChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountDownContextProvider>
    </div>
  )
}
