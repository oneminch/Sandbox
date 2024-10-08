import Accordion from "./components/Accordion";
import AnimatedFillButton from "./components/AnimatedFillButton";
import AnimatedFoldingCard from "./components/AnimatedFoldingCard";
import CSSCounter from "./components/CSSCounter";
import CSSTooltip from "./components/CSSTooltip";
import Flags from "./components/Flags";
import PulsingDot from "./components/PulsingDot";
import Rainbow from "./components/Rainbow";
import SectionDivider from "./components/SectionDivider";
import ToC from "./components/ToC";

function App() {
	return (
		<>
			<h1>Hello, CSS!</h1>

			<ToC />

			<SectionDivider />

			<section id="element-animations">
				<h2>Element Animations</h2>
				<AnimatedFillButton />
				<AnimatedFoldingCard />
			</section>

			<SectionDivider />

			<section id="css-content">
				<h2>CSS Content</h2>
				<CSSCounter />
				<CSSTooltip />
			</section>

			<SectionDivider />

			<section id="single-div">
				<h2>
					Single <code>&lt;div&gt;</code> Possibilities
				</h2>
				<Flags />
				<PulsingDot />
			</section>

			<SectionDivider />

			<section id="css-gradients">
				<h2>CSS Gradients</h2>
				<Rainbow />
			</section>

			<SectionDivider />

			<section id="css-accordion">
				<h2>Pure CSS Accordion</h2>
				<Accordion />
			</section>

			<SectionDivider />
		</>
	);
}

export default App;
