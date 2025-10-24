import "./radioInput.css";

type Props = {
	text: string;
	options: string[];
	selectedOption: string;
	onChange: (value: string) => void;
};

const RadioInput: React.FC<Props> = ({
	text,
	options,
	selectedOption,
	onChange,
}) => {
	return (
		<div className="radioInputContainer">
			<p className="radioInputLabel">{text}</p>
			<div className="radioInputOptionsContainer">
				{options.map((option) => (
					<label key={option} className="radioInputLabel">
						<input
							type="radio"
							name={text}
							value={option}
							checked={selectedOption === option}
							onChange={() => onChange(option)}
							className="radioInputRadio"
						/>
						{option}
					</label>
				))}
			</div>
		</div>
	);
};

export default RadioInput;
