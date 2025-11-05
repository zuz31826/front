import TextTitle from "../../components/textTitle/TextTitle";
// import InstaLink from "../../components/instaLink/InstaLink";
import InstaLinkLight from "../../components/instaLinkLight/InstaLinkLight";
import dot1 from "../../assets/images/dot1.png";
import dot2 from "../../assets/images/dot2.png";
import spacer from "../../assets/images/spacer.png";
import "./contactScreen.css";

const ContactScreen: React.FC = () => (
	<div className="contactContainer">
		<div className="contactDotInfoContainer contactMarginBottom">
			<img src={dot1} alt="Dot" className="contactDot" />
			<TextTitle text="For tattoo bookings:" className="contactText" />
		</div>

		<TextTitle text="the booking form on the website" className="contactText" />

		<a href="mailto:wruszkatutuasz@gmail.com" className="contactMarginBottom">
			<TextTitle text="Or wruszkatutuasz@gmail.com" className="contactText" />
		</a>

		<div className="contactDotInfoContainer contactMarginBottom">
			<img src={dot2} alt="Dot" className="contactDot" />
			<TextTitle text="For collaboration:" className="contactText" />
		</div>

		<a href="mailto:wruszkatutuasz@gmail.com">
			<TextTitle text="wruszkatutuasz@gmail.com" className="contactText" />
		</a>

		<img src={spacer} alt="Spacer" className="contactSpacer" />

		{/* <InstaLink containerClassName="contactMarginTop" /> */}
		<InstaLinkLight containerClassName="contactMarginTop" />
	</div>
);

export default ContactScreen;
