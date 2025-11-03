import "./textTitle.css";

type Props = {
	text: string;
	className?: string;
};

const TextTitle: React.FC<Props> = ({ text, className = "" }) => {
	return <p className={`textTitle ${className}`}>{text}</p>;
};

export default TextTitle;
