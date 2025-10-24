import { useState } from "react";
import { bookingSections } from "../../bookingTexts";
import "./bookingInfo.css";

const BookingInfo = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleSection = (index: number) =>
		setOpenIndex(openIndex === index ? null : index);

	return (
		<div className="bookingInfoContainer">
			{bookingSections.map((section, index) => (
				<div key={index} className="bookingInfoItem">
					<button
						className={`bookingInfoButton ${
							openIndex === index ? "active" : ""
						}`}
						onClick={() => toggleSection(index)}
					>
						{section.title}
					</button>
					<div
						className={`bookingInfoContent ${
							openIndex === index ? "open" : ""
						}`}
					>
						<p>{section.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default BookingInfo;
