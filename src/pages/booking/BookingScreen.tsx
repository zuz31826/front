import BookingInfo from "./components/bookingInfo/BookingInfo";
import BookingForm from "./components/bookingForm/BookingForm";
import "./bookingScreen.css";

const BookingScreen: React.FC = () => {
	return (
		<div className="bookingContainer">
			<BookingInfo />
			<BookingForm />
		</div>
	);
};

export default BookingScreen;
