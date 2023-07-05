import styles from "../styles/components/Profile.module.css";

export const Profile = () => {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/luccagbr.png" alt="Lucca Gabriel"/>
            <div>
                <strong>Lucca  Gabriel</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}