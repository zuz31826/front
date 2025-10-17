import "./button.css";

type Props = {
	text: string;
};

const Button: React.FC<Props> = (props) => {
	return (
		<div className="buttonContainer">
			<p className="buttonText">{props.text}</p>
		</div>
	);
};

export default Button;
