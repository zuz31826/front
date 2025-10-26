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
	const [touched, setTouched] = useState<Record<keyof BookingInfo, boolean>>({
		name: false,
		instagram: false,
		email: false,
		size: false,
		vision: false,
		date: false,
		place: false,
	});

	const changeHandler = (field: keyof BookingInfo, value: string) => {
		setBookingInfo({ ...bookingInfo, [field]: value });
		if (touched[field]) setTouched({ ...touched, [field]: false });
	};

	const submitHandler = () => {
		const emptyFields = Object.entries(bookingInfo)
			.filter(([_, value]) => !value.trim())
			.map(([key]) => key as keyof BookingInfo);

		if (emptyFields.length > 0) {
			const updatedTouched = { ...touched };
			emptyFields.forEach((key) => (updatedTouched[key] = true));
			setTouched(updatedTouched);
			return;
		}

		const orderPayload: BookingInfo = { ...bookingInfo };

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
					text="Name / pronouns:"
					value={bookingInfo.name}
					onChange={(value) => changeHandler("name", value)}
					error={touched.name && !bookingInfo.name}
				/>
				<Input
					text="Instagram"
					value={bookingInfo.instagram}
					onChange={(value) => changeHandler("instagram", value)}
					error={touched.instagram && !bookingInfo.instagram}
				/>
				<Input
					text="E-mail:"
					value={bookingInfo.email}
					onChange={(value) => changeHandler("email", value)}
					error={touched.email && !bookingInfo.email}
				/>
			</div>

			<p className="bookingFormSubtitle">About tattoo:</p>
			<div className="bookingFormInputsContainer">
				<Input
					text="Size & placement:"
					value={bookingInfo.size}
					onChange={(value) => changeHandler("size", value)}
					error={touched.size && !bookingInfo.size}
				/>
				<Input
					text="About your vision:"
					multiple
					value={bookingInfo.vision}
					onChange={(value) => changeHandler("vision", value)}
					error={touched.vision && !bookingInfo.vision}
				/>
				<Input
					text="Date of appointment:"
					value={bookingInfo.date}
					onChange={(value) => changeHandler("date", value)}
					error={touched.date && !bookingInfo.date}
				/>
				<p className="bookingFormInfoText">
					(check my instagram for available date)
				</p>

				<RadioInput
					text="Appointment in:"
					options={["Poznan", "Berlin"]}
					selectedOption={bookingInfo.place}
					onChange={(value) => changeHandler("place", value)}
					error={touched.place && !bookingInfo.place}
				/>
			</div>

			{isSubmitted ? (
				<p className="bookingFormSubmitButton">Thank you</p>
			) : (
				<button className="bookingFormSubmitButton" onClick={submitHandler}>
					Submit
				</button>
			)}
		</div>
	);
};

export default BookingForm;
