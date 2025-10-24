import { useState } from "react";
import Input from "../../../../components/input/Input";
import RadioInput from "../../../../components/radioInput/RadioInput";
import "./bookingForm.css";

type bookingInfo = {
	name: string;
	instagram: string;
	email: string;
	size: string;
	vision: string;
	date: string;
	place: "Poznan" | "Berlin" | "";
};

const BookingForm = () => {
	const [bookingInfo, setBookingInfo] = useState<bookingInfo>({
		name: "",
		instagram: "",
		email: "",
		size: "",
		vision: "",
		date: "",
		place: "",
	});

	const changeHandler = (field: keyof bookingInfo, value: string) => {
		setBookingInfo({ ...bookingInfo, [field]: value });
	};

	return (
		<div className="bookingFormContainer">
			<p className="bookingFormTitle">Booking Form</p>

			<p className="bookingFormSubtitle">Personal information:</p>
			<div className="bookingFormInputsContainer">
				<Input
					text="Name / pronouns:"
					value={bookingInfo.name}
					onChange={(value) => changeHandler("name", value)}
				/>
				<Input
					text="Instagram:"
					value={bookingInfo.instagram}
					onChange={(value) => changeHandler("instagram", value)}
				/>
				<Input
					text="E-mail:"
					value={bookingInfo.email}
					onChange={(value) => changeHandler("email", value)}
				/>
			</div>

			<p className="bookingFormSubtitle">About tattoo:</p>
			<div className="bookingFormInputsContainer">
				<Input
					text="Size & placement:"
					value={bookingInfo.size}
					onChange={(value) => changeHandler("size", value)}
				/>
				<Input
					text="About your vision:"
					multiple
					value={bookingInfo.vision}
					onChange={(value) => changeHandler("vision", value)}
				/>
				<Input
					text="Date of appointment:"
					value={bookingInfo.date}
					onChange={(value) => changeHandler("date", value)}
				/>
				<p className="bookingFormInfoText">{`(check my instagram for available date)`}</p>

				<RadioInput
					text="Appointment in:"
					options={["Poznan", "Berlin"]}
					selectedOption={bookingInfo.place}
					onChange={(value) => changeHandler("place", value)}
				/>
			</div>

			<button
				className="bookingFormSubmitButton"
				onClick={() => console.log(bookingInfo)}
				disabled={
					!bookingInfo.name ||
					!bookingInfo.email ||
					!bookingInfo.size ||
					!bookingInfo.vision ||
					!bookingInfo.date ||
					!bookingInfo.place
				}
			>
				Submit
			</button>
		</div>
	);
};

export default BookingForm;
