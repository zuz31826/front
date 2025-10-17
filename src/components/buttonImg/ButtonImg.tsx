import "./buttonImg.css";

type Props = {
	image: string;
	alt: string;
	onClick?: () => void;
	big?: boolean;
};

const ButtonImg: React.FC<Props> = (props) => {
	return (
		<div onClick={props.onClick}>
			<img
				src={props.image}
				alt={props.alt}
				className={`buttonImgButt ${props.big ? "buttonImgButtBig" : ""}`}
			/>
		</div>
	);
};

export default ButtonImg;
