import "./bookingInput.css";

type Props = {
	text: string;
	multiple?: boolean;
	value?: string;
	onChange?: (value: string) => void;
	rows?: number;
	error?: boolean;
};

const BookingInput: React.FC<Props> = ({
	text,
	value,
	onChange,
	multiple,
	rows = 4,
	error,
}) => {
	return (
		<div className="bookingInputContainer">
			<p className="bookingInputLabel">{text}</p>
			{multiple ? (
				<textarea
					className={`bookingInputField bookingInputTextarea ${
						error ? "bookingInputError" : ""
					}`}
					value={value}
					rows={rows}
					onChange={(e) => onChange && onChange(e.target.value)}
				/>
			) : (
				<input
					className={`bookingInputField ${error ? "bookingInputError" : ""}`}
					type="text"
					value={value}
					onChange={(e) => onChange && onChange(e.target.value)}
				/>
			)}
		</div>
	);
};

export default BookingInput;
