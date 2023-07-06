import { useContext } from "react";
import styles from "../styles/components/Profile.module.css";
import { ChallengesContext } from "@/context/ChallengesContext";

export const Profile = () => {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/luccagbr.png" alt="Lucca Gabriel"/>
            <div>
                <strong>Lucca  Gabriel</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}