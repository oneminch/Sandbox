import styles from "./AnimatedFillButton.module.css";

const AnimatedFillButton = () => {
	return (
		<>
			<h3>Filling Button</h3>
			<button className={styles["animated-fill-button"]}>Submit</button>
		</>
	);
};

export default AnimatedFillButton;
