import "./button.css";

type Props = {
	text: string;
	onClick?: () => void;
};

const Button: React.FC<Props> = (props) => {
	return (
		<div className="buttonContainer" onClick={props.onClick}>
			<p className="buttonText">{props.text}</p>
		</div>
	);
};

export default Button;
