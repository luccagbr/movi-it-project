import { ReactNode, createContext, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "@/components/LevelUpModal";

interface IChallengesProvider {
    children: ReactNode;
    cookieLevel: number;
    cookieCurrentExperience: number;
    cookieChallengesCompleted: number;
}

type Challenge = {
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
    closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider: React.FC<IChallengesProvider> = ({children, cookieLevel, cookieCurrentExperience, cookieChallengesCompleted}) => {
    const [ level, setLevel ] = useState(cookieLevel ?? 1);
    const [ currentExperience, setCurrentExperience ] = useState(cookieCurrentExperience ?? 0);
    const [ challengesCompleted, setChallengesCompleted ] = useState(cookieChallengesCompleted ?? 0);
    const [ activeChallenge, setActiveChallenge ] = useState<Challenge | any>(null);
    const [ isSetLevelModal, setIsSetLevelModal ] = useState(false);
    
    const resetChallenge = () => {
        setActiveChallenge(null);
    }

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', `${level}`);
        Cookies.set('currentExperience', `${currentExperience}`);
        Cookies.set('challengesCompleted', `${challengesCompleted}`);
    }, [level, currentExperience, challengesCompleted]);

    const levelUp = () => {
        setLevel(level + 1);
        setIsSetLevelModal(true);
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

    const closeLevelUpModal = () => {
        setIsSetLevelModal(false);
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
                completeChallenge,
                closeLevelUpModal
            }}>
            {children}

            {isSetLevelModal && <LevelUpModal />
            }
        </ChallengesContext.Provider>
    );
}