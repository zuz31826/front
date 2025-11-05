import TextTitle from "../textTitle/TextTitle";
import inst from "../../assets/images/inst.png";
import "./instaLink.css";

type Props = {
	containerClassName?: string;
};

const InstaLink: React.FC<Props> = ({ containerClassName }) => {
	return (
		<div className={`instaLinkContainer ${containerClassName}`}>
			<img src={inst} alt="Instagram" className="instaLinkImage" />
			<a
				href="https://www.instagram.com/wruszkatutuasz"
				target="_blank"
				rel="noopener noreferrer"
			>
				<TextTitle text="wruszkatutuasz" className="instaLinkText" />
			</a>
		</div>
	);
};

export default InstaLink;
