import "./input.css";

type Props = {
	text: string;
	multiple?: boolean;
	value?: string;
	onChange?: (value: string) => void;
	rows?: number;
};

const Input: React.FC<Props> = ({
	text,
	value,
	onChange,
	multiple,
	rows = 4,
}) => {
	return (
		<div className="inputContainer">
			<p className="inputLabel">{text}</p>
			{multiple ? (
				<textarea
					className="inputField inputTextarea"
					value={value}
					rows={rows}
					onChange={(e) => onChange && onChange(e.target.value)}
				/>
			) : (
				<input
					className="inputField"
					type="text"
					value={value}
					onChange={(e) => onChange && onChange(e.target.value)}
				/>
			)}
		</div>
	);
};

export default Input;
