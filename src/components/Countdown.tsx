import { useEffect, useState } from "react"
import styles from "../styles/components/Countdown.module.css"

let countDownTimeout: NodeJS.Timeout;

export const Countdown = () => {
    const [ time, setTime ] = useState(0.1 * 60);
    const [ isActive, setIsActive ] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    const [hasFinished, setHasFinished] = useState(false);

    const startCountDown = () => {
        setIsActive(true);
    }

    const resetCountDown = () => {
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time-1);
            },1000);
        } else if(isActive && time === 0) { 
            setHasFinished(true);
            setIsActive(false);
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                    <div>
                        <span>{minuteLeft}</span>
                        <span>{minuteRight}</span>
                    </div>
                    <span>:</span>
                    <div>

                        <span>{secondLeft}</span>
                        <span>{secondRight}</span>
                    </div>
            </div>

            {hasFinished ? (
                <button 
                    disabled
                    className={styles.countDownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                            onClick={resetCountDown}
                            >
                                Abandonar Ciclo
                        </button>
                        
                        ) : (
                        <button 
                            type="button" 
                            className={styles.countDownButton}
                            onClick={startCountDown}
                            >
                                Iniciar um ciclo
                        </button>
            )}
                </>
            )}
        </div>
    )
}