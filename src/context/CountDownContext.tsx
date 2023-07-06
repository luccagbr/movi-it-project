import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

let countDownTimeout: NodeJS.Timeout;

interface ICountDownContextProvider {
    children: ReactNode;  
}

interface ICountDownContext {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

export const CountDownContext = createContext({} as ICountDownContext);

export const CountDownContextProvider: React.FC<ICountDownContextProvider> = ({ children }) => {
    const [ time, setTime ] = useState(0.1 * 60);
    const [ isActive, setIsActive ] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const { startNewChallenge } = useContext(ChallengesContext);

    const startCountDown = () => {
        setIsActive(true);
    }

    const resetCountDown = () => {
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time-1);
            },1000);
        } else if(isActive && time === 0) { 
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


    return (
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            isActive,
            hasFinished,
            startCountDown,
            resetCountDown
        }}>
            {children}
        </CountDownContext.Provider>
    )
}