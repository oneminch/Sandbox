import styles from "./Flags.module.css";

const Flags = () => {
	return (
		<>
			<h3>Flags</h3>
			<div className={styles["ethiopian-flag"]}></div>
			<div className={styles["sudan-flag"]}></div>
			<div className={styles["cameroon-flag"]}></div>
		</>
	);
};

export default Flags;
