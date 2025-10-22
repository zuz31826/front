import { useEffect, useState } from "react";
import burger from "../../assets/images/burger.png";
import name from "../../assets/images/name.png";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
	const navigation = useNavigate();
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [menuOpen, setMenuOpen] = useState(false);

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

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [menuOpen]);

	const navigationHandler = (path: string) => {
		navigation(path);
		setMenuOpen(false);
	};

	return (
		<>
			<div className={`header ${show ? "header--visible" : "header--hidden"}`}>
				<img
					src={name}
					alt="Name"
					className="headerNameImg"
					onClick={() => navigationHandler("/")}
				/>
				<img
					src={burger}
					alt="Menu"
					className="headerBurgerImg"
					onClick={() => setMenuOpen(true)}
				/>
			</div>

			<div
				className={`overlay ${menuOpen ? "overlay--visible" : ""}`}
				onClick={() => setMenuOpen(false)}
			/>

			<div className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}>
				<button className="sidebar__close" onClick={() => setMenuOpen(false)}>
					×
				</button>
				<ul className="sidebar__menu">
					<li onClick={() => navigationHandler("/tattoo")}>Tattoo work</li>
					<li>Visual art</li>
					<li>Collaboration</li>
					<li>About me</li>
					<li>Contact</li>
				</ul>
			</div>
		</>
	);
};

export default Header;
