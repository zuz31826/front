import "./bookingRadioInput.css";

type Props = {
	text: string;
	options: string[];
	selectedOption: string;
	onChange: (value: string) => void;
	error?: boolean;
};

const BookingRadioInput: React.FC<Props> = ({
	text,
	options,
	selectedOption,
	onChange,
	error,
}) => {
	return (
		<div className="bookingRadioInputContainer">
			<p className="bookingRadioInputLabel">{text}</p>
			<div
				className={`bookingRadioInputOptionsContainer ${
					error ? "bookingRadioInputError" : ""
				}`}
			>
				{options.map((option) => (
					<label key={option} className="bookingRadioInputLabel">
						<input
							type="radio"
							name={text}
							value={option}
							checked={selectedOption === option}
							onChange={() => onChange(option)}
							className="bookingRadioInputRadio"
						/>
						{option}
					</label>
				))}
			</div>
		</div>
	);
};

export default BookingRadioInput;
