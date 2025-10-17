import { useEffect, useState } from "react";
import burger from "../../assets/images/burger.png";
import "./header.css";

const Header: React.FC = () => {
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > lastScrollY) {
				setShow(false);
			} else {
				setShow(true);
			}
			setLastScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<div className={`header ${show ? "header--visible" : "header--hidden"}`}>
			<p className="headerTitle">Wruszka</p>
			<img src={burger} alt="Burger" className="headerBurgerImg" />
		</div>
	);
};

export default Header;
