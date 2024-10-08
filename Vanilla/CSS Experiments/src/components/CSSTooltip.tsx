import styles from "./CSSTooltip.module.css";

const CSSTooltip = () => {
	return (
		<>
			<h3>
				CSS Tooltips - <code>::before</code> | <code>::after</code>
			</h3>
			<blockquote className={styles["css-tooltips"]}>
				<a
					data-tooltip="Mozilla Developer Network"
					href="https://developer.mozilla.org/en-US/">
					MDN
				</a>
			</blockquote>
		</>
	);
};

export default CSSTooltip;
