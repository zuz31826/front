import TextInfo from "../../../../components/textInfo/TextInfo";
import "./visualArtHeaderText.css";

const VisualArtHeaderText: React.FC = () => {
	return (
		<div className="visualArtHeaderContainer">
			<TextInfo
				text="Visual language allows me to invent new worlds, new characters, new
				feelings. I am taking inspiration from all I’ve seen, experianced and
				felt and translating it into an imagine. It’s like breathing -
				miraculous & necessary."
				className="visualArtHeaderText"
			/>
			<TextInfo
				text="The act of creation makes me believe we have a soul."
				className="visualArtHeaderText"
			/>
		</div>
	);
};

export default VisualArtHeaderText;
