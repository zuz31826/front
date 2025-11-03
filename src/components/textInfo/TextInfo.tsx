import "./textInfo.css";

type Props = {
	text: string;
	className?: string;
};

const TextInfo: React.FC<Props> = ({ text, className = "" }) => {
	return (
		<p
			className={`textInfo ${className}`}
			dangerouslySetInnerHTML={{ __html: text }}
		/>
	);
};

export default TextInfo;
