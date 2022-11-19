import { useMainContext } from "../contexts/mainContext";
import "./MainLayout.css";

export default function MainLayout(props) {
	const mainCtx = useMainContext();

	return (
		<div className="main-layout">
			<nav
				className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
				role="navigation"
			>
				<div className="container">
					<a
						className="navbar-brand"
						onClick={() => mainCtx.setCurrentPage("dashboard")}
					>
						<img src="assets/img/brand.png" alt="icon" id="brand-icon" /> Team 8
					</a>
					<button
						className="navbar-toggler border-0"
						type="button"
						data-toggle="collapse"
						data-target="#exCollapsingNavbar"
					>
						&#9776;
					</button>
					<div className="collapse navbar-collapse" id="exCollapsingNavbar">
						<ul className="nav navbar-nav">
							<li className="nav-item">
								<a
									className="nav-link"
									onClick={() => mainCtx.setCurrentPage("dashboard")}
								>
									Dashboard
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link"
									onClick={() => mainCtx.setCurrentPage("invoices")}
								>
									Invoices
								</a>
							</li>
							{/* <li className="nav-item">
								<a href="add-invoice.html" className="nav-link">
									Add Invoice
								</a>
							</li> */}
						</ul>
						<ul className="nav navbar-nav flex-row justify-content-between ml-auto">
							<li className="dropdown order-1">
								<button
									type="button"
									id="dropdownMenu1"
									data-toggle="dropdown"
									className="btn btn-outline-secondary bg-secondary dropdown-toggle black"
								>
									<img
										src="https://img.icons8.com/material-two-tone/512/user.png"
										alt="user"
										id="user"
									/>
									<span id="profile">Profile</span>
								</button>
								<ul className="dropdown-menu dropdown-menu-right mt-1">
									<a className="dropdown-item" href="settings.html">
										<img
											src="https://img.icons8.com/sf-black/512/gear.png"
											alt="Settings"
											className="icon-settings"
										/>
										Settings
									</a>
									<a className="dropdown-item" href="login-page-v1/index.html">
										<img
											src="https://img.icons8.com/ios-filled/512/logout-rounded.png"
											alt="Logout"
											className="icon-logout margin-right"
										/>
										Logout
									</a>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<main className="container" id="main-container">
				{props.children}
			</main>

			<footer>
				<div className="footer-main bg-secondary mt-3">
					Sovos Hackathon - TEAM 8
				</div>
			</footer>
		</div>
	);
}
