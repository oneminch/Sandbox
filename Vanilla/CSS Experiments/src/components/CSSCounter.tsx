import styles from "./CSSCounter.module.css";

const CSSCounter = () => {
	return (
		<>
			<h3>
				CSS Counters - <code>counter()</code>
			</h3>
			<div className={styles["css-counters"]}>
				<ul>
					<li>Item</li>
					<li>Item</li>
					<li>Item</li>
				</ul>
			</div>
		</>
	);
};

export default CSSCounter;
