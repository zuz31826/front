import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import burger from "../../assets/images/burgerButt.png";
import name from "../../assets/images/name.png";
import "./header.css";

const Header: React.FC = () => {
	const navigation = useNavigate();
	const [show, setShow] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const lastScrollY = useRef(0);

	useEffect(() => {
		let ticking = false;

		const handleScroll = () => {
			const currentScrollY =
				window.scrollY || document.documentElement.scrollTop || 0;

			if (Math.abs(currentScrollY - lastScrollY.current) < 4) return;

			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
						setShow(false);
					} else {
						setShow(true);
					}
					lastScrollY.current = currentScrollY;
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "auto";
	}, [menuOpen]);

	const navigationHandler = (path: string) => {
		navigation(path);
		setMenuOpen(false);
	};

	return (
		<>
			<header
				className={`header ${show ? "header--visible" : "header--hidden"}`}
			>
				<img
					src={name}
					alt="Name"
					className="headerNameImg"
					onClick={() => navigationHandler("/")}
				/>
				<div className="headerBurgerImgContainer">
					<img
						src={burger}
						alt="Menu"
						className="headerBurgerImg"
						onClick={() => setMenuOpen(true)}
					/>
				</div>
			</header>

			<div
				className={`overlay ${menuOpen ? "overlay--visible" : ""}`}
				onClick={() => setMenuOpen(false)}
			/>

			<aside className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}>
				<button className="sidebar__close" onClick={() => setMenuOpen(false)}>
					×
				</button>
				<ul className="sidebar__menu">
					<li onClick={() => navigationHandler("/tattoo")}>Tattoo work</li>

					<li
						className="sidebar__menu_margin"
						onClick={() => navigationHandler("/booking")}
					>
						Book a tattoo
					</li>
					<li
						className="sidebar__menu_margin"
						onClick={() => navigationHandler("/portfolio")}
					>
						Portfolio
					</li>

					<li onClick={() => navigationHandler("/visual-art")}>Visual art</li>
					<li
						className="sidebar__menu_margin"
						onClick={() => navigationHandler("/painting")}
					>
						Paintings
					</li>
					<li
						className="sidebar__menu_margin"
						onClick={() => navigationHandler("/illustration")}
					>
						Illustration
					</li>
					<li
						className="sidebar__menu_margin"
						onClick={() => navigationHandler("/sketch")}
					>
						Sketchbook
					</li>

					<li>Collaboration</li>
					<li onClick={() => navigationHandler("/about")}>About me</li>
					<li onClick={() => navigationHandler("/contact")}>Contact</li>
				</ul>
			</aside>
		</>
	);
};

export default Header;
