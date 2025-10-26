import "./input.css";

type Props = {
	text: string;
	multiple?: boolean;
	value?: string;
	onChange?: (value: string) => void;
	rows?: number;
	error?: boolean;
};

const Input: React.FC<Props> = ({
	text,
	value,
	onChange,
	multiple,
	rows = 4,
	error,
}) => {
	return (
		<div className="inputContainer">
			<p className="inputLabel">{text}</p>
			{multiple ? (
				<textarea
					className={`inputField inputTextarea ${error ? "inputError" : ""}`}
					value={value}
					rows={rows}
					onChange={(e) => onChange && onChange(e.target.value)}
				/>
			) : (
				<input
					className={`inputField ${error ? "inputError" : ""}`}
					type="text"
					value={value}
					onChange={(e) => onChange && onChange(e.target.value)}
				/>
			)}
		</div>
	);
};

export default Input;
