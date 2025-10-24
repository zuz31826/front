import { useEffect, useState } from "react";
import Input from "../../../../components/input/Input";
import RadioInput from "../../../../components/radioInput/RadioInput";
import type { BookingInfo } from "../../../../types";
import "./bookingForm.css";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

const BookingForm = () => {
	const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
		name: "",
		instagram: "",
		email: "",
		size: "",
		vision: "",
		date: "",
		place: "",
	});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const changeHandler = (field: keyof BookingInfo, value: string) => {
		setBookingInfo({ ...bookingInfo, [field]: value });
	};

	const submitHandler = () => {
		const orderPayload: BookingInfo = {
			name: bookingInfo.name,
			instagram: bookingInfo.instagram,
			email: bookingInfo.email,
			size: bookingInfo.size,
			vision: bookingInfo.vision,
			date: bookingInfo.date,
			place: bookingInfo.place,
		};
		fetch(`${apiUrl}/api/users-forms`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: orderPayload }),
		})
			.then((res) => {
				if (!res.ok) throw new Error(`Error: ${res.status}`);
				setBookingInfo({
					name: "",
					instagram: "",
					email: "",
					size: "",
					vision: "",
					date: "",
					place: "",
				});
				setIsSubmitted(true);
				return res.json();
			})
			.then(() => console.log("Form submitted"))
			.catch((err) => console.error("Failed:", err));
	};

	useEffect(() => {
		if (isSubmitted) {
			const timer = setTimeout(() => {
				setIsSubmitted(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isSubmitted]);

	return (
		<div className="bookingFormContainer">
			<p className="bookingFormTitle">Booking Form</p>

			<p className="bookingFormSubtitle">Personal information:</p>
			<div className="bookingFormInputsContainer">
				<Input
					text="Name / pronouns*"
					value={bookingInfo.name}
					onChange={(value) => changeHandler("name", value)}
				/>
				<Input
					text="Instagram"
					value={bookingInfo.instagram}
					onChange={(value) => changeHandler("instagram", value)}
				/>
				<Input
					text="E-mail*"
					value={bookingInfo.email}
					onChange={(value) => changeHandler("email", value)}
				/>
			</div>

			<p className="bookingFormSubtitle">About tattoo:</p>
			<div className="bookingFormInputsContainer">
				<Input
					text="Size & placement*"
					value={bookingInfo.size}
					onChange={(value) => changeHandler("size", value)}
				/>
				<Input
					text="About your vision*"
					multiple
					value={bookingInfo.vision}
					onChange={(value) => changeHandler("vision", value)}
				/>
				<Input
					text="Date of appointment*"
					value={bookingInfo.date}
					onChange={(value) => changeHandler("date", value)}
				/>
				<p className="bookingFormInfoText">{`(check my instagram for available date)`}</p>

				<RadioInput
					text="Appointment in*"
					options={["Poznan", "Berlin"]}
					selectedOption={bookingInfo.place}
					onChange={(value) => changeHandler("place", value)}
				/>
			</div>

			{isSubmitted ? (
				<p className="bookingFormSubmitButton">Thank you</p>
			) : (
				<button
					className="bookingFormSubmitButton"
					onClick={submitHandler}
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
			)}
		</div>
	);
};

export default BookingForm;
