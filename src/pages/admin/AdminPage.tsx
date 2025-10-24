import { useEffect, useState } from "react";
import type { AdminInfo } from "../../types";
import "./adminPage.css";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

const AdminPage: React.FC = () => {
	const [isLogged, setIsLogged] = useState(false);
	const [loading, setLoading] = useState(true);
	const [password, setPassword] = useState("");
	const [data, setData] = useState<AdminInfo[]>([]);

	useEffect(() => {
		const loggedIn = localStorage.getItem("isLogged");
		if (loggedIn === "true") {
			setIsLogged(true);
		}

		fetch(`${apiUrl}/api/users-forms?populate=*`)
			.then((res) => res.json())
			.then((data) => {
				if (data.data) {
					const sortedOrders = data.data.sort(
						(a: AdminInfo, b: AdminInfo) =>
							new Date(b.createdAt || "").getTime() -
							new Date(a.createdAt || "").getTime()
					);
					setData(sortedOrders);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const loginHandler = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/check-pin`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ pin: password }),
			});

			const result = await res.json();

			if (result.success) {
				setIsLogged(true);
				localStorage.setItem("isLogged", "true");
				setPassword("");
			} else {
				alert("Wrong PIN");
				setPassword("");
			}
		} catch (error) {
			console.error(error);
			alert("Server error");
		}
	};

	const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

	if (!isLogged) {
		return (
			<div className="adminContainer adminLoginContainer">
				<p className="adminRegularText">Login</p>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="adminInput"
					autoFocus
				/>
				<button className="adminButton" onClick={loginHandler}>
					Submit
				</button>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="adminContainer adminLoginContainer">
				<p className="adminLightText">Loading...</p>
			</div>
		);
	}

	return (
		<div className="adminContainer">
			<div className="adminHeader">
				<button
					className="adminExitButton"
					onClick={() => {
						setIsLogged(false);
						localStorage.removeItem("isLogged");
					}}
				>
					exit
				</button>
			</div>

			{data.map((admin) => (
				<div key={admin.id} className="adminCard">
					<p className="adminLightText">
						Name: <span className="adminRegularText">{admin.name}</span>
					</p>
					{admin.instagram && (
						<p
							className="adminLightText adminCopyable"
							onClick={() => copyToClipboard(admin.instagram)}
						>
							Instagram:{" "}
							<span className="adminRegularText">{admin.instagram}</span>
						</p>
					)}
					<p
						className="adminLightText adminCopyable"
						onClick={() => copyToClipboard(admin.email)}
					>
						E-mail: <span className="adminRegularText">{admin.email}</span>
					</p>
					<p className="adminLightText">
						Size: <span className="adminRegularText">{admin.size}</span>
					</p>
					<p className="adminLightText">
						Vision: <span className="adminRegularText">{admin.vision}</span>
					</p>
					<p className="adminLightText">
						Date: <span className="adminRegularText">{admin.date}</span>
					</p>
					<p className="adminLightText">
						Place: <span className="adminRegularText">{admin.place}</span>
					</p>
				</div>
			))}
		</div>
	);
};

export default AdminPage;
