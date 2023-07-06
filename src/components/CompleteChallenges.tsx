import { useContext } from "react";
import styles from "../styles/components/CompleteChallenges.module.css";
import { ChallengesContext } from "@/context/ChallengesContext";

export const CompleteChallenges = () => {
    const { challengesCompleted } = useContext(ChallengesContext);

    return (
        <div className={styles.completeChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}