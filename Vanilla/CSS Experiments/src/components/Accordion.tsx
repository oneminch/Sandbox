import { ChangeEvent, useState } from "react";
import styles from "./Accordion.module.css";

const accordionItems = [
	{
		id: "x",
		value: "Indigo"
	},
	{
		id: "y",
		value: "Violet"
	},
	{
		id: "z",
		value: "Pink"
	}
];

const Accordion = () => {
	const [option, setOption] = useState(accordionItems[0].value);

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setOption(event.target.value);
	};

	return (
		<div className={styles.accordion}>
			{accordionItems.map((item) => (
				<label htmlFor={item.id}>
					<input
						type="radio"
						value={item.value}
						id={item.id}
						onChange={handleOptionChange}
						checked={option === item.value}
					/>
					<span>{item.value}</span>
					<div></div>
				</label>
			))}
		</div>
	);
};

export default Accordion;
