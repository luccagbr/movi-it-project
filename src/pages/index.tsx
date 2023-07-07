import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from "../styles/pages/Home.module.css";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import Head from "next/head";
import { ChallengeBox } from "@/components/ChallengeBox";
import { CountDownContextProvider } from "@/context/CountDownContext";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { ChallengesProvider } from "@/context/ChallengesContext";

type THomeProps = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({ level, currentExperience, challengesCompleted }: THomeProps) {

  console.log(level , ' ', currentExperience, ' ', challengesCompleted);

  return (
    <ChallengesProvider cookieLevel={level} cookieCurrentExperience={currentExperience} cookieChallengesCompleted={challengesCompleted}>
      <div className = {styles.container}>
        <Head>
          <title>Início | Movi.it</title>
        </Head>

        <ExperienceBar/>

        <CountDownContextProvider>
          <section>
            <div>
              <Profile/>
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownContextProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted} = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
