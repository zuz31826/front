import { useEffect, useState } from "react";
import type { AdminInfo } from "../../types";
import "./adminPage.css";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

const AdminPage: React.FC = () => {
	const [isLogined, setIsLogined] = useState(false);
	const [loading, setLoading] = useState(true);
	const [password, setPassword] = useState("");
	const [data, setData] = useState<AdminInfo[]>([]);

	useEffect(() => {
		fetch(`${apiUrl}/api/admins?populate=*`)
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

	const loginHandler = () => {
		if (password === "1111") {
			setIsLogined(true);
		} else {
			alert("Wrong password");
		}
	};

	const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

	if (!isLogined) {
		return (
			<div className="adminContainer loginContainer">
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
			<div className="adminContainer loginContainer">
				<p className="adminLightText">Loading...</p>
			</div>
		);
	}

	return (
		<div className="adminContainer">
			{data.map((admin) => (
				<div key={admin.id} className="adminCard">
					<p className="adminLightText">
						Name: <span className="adminRegularText">{admin.name}</span>
					</p>

					{admin.instagram && (
						<p
							className="adminLightText copyable"
							onClick={() => copyToClipboard(admin.instagram)}
						>
							Instagram:{" "}
							<span className="adminRegularText">{admin.instagram}</span>
						</p>
					)}

					<p
						className="adminLightText copyable"
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
