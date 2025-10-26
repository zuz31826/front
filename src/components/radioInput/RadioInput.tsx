import "./radioInput.css";

type Props = {
	text: string;
	options: string[];
	selectedOption: string;
	onChange: (value: string) => void;
	error?: boolean;
};

const RadioInput: React.FC<Props> = ({
	text,
	options,
	selectedOption,
	onChange,
	error,
}) => {
	return (
		<div className="radioInputContainer">
			<p className="radioInputLabel">{text}</p>
			<div
				className={`radioInputOptionsContainer ${
					error ? "radioInputError" : ""
				}`}
			>
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
