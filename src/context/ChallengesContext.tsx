import { ReactNode, createContext, useEffect, useState } from "react";
import challenges from "../../challenges.json";

interface IChallengesProvider {
    children: ReactNode;
}

interface Challenge {
    type: "body" | "eye";
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    levelUp: () => void;
    currentExperience: number;
    startNewChallenge: () => void;
    challengesCompleted: number;
    activeChallenge: Challenge | null;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider: React.FC<IChallengesProvider> = ({children}) => {
    const [ level, setLevel ] = useState(1);
    const [ currentExperience, setCurrentExperience ] = useState(0);
    const [ challengesCompleted, setChallengesCompleted ] = useState(0);
    const [ activeChallenge, setActiveChallenge ] = useState<Challenge | null>(null);

    const resetChallenge = () => {
        setActiveChallenge(null);
    }

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    const levelUp = () => {
        setLevel(level + 1);
    }

    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge);

        new Audio('./notification.mp3').play();

        if(Notification.permission === "granted") {
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount} xp`
            }) 
        }
    }

    const completeChallenge = () => {
        if(!activeChallenge) {
            return;
        } 

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    const experienceToNextLevel = Math.pow(((level + 1) * 4), 2);

    return (
        <ChallengesContext.Provider 
            value={{ 
                level,
                levelUp,
                currentExperience,
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    );
}