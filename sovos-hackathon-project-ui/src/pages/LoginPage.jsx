import { useEffect } from "react";
import { useMainContext } from "../contexts/mainContext";
import "./LoginPage.css";

export default function LoginPage() {
	const mainCtx = useMainContext();

	useEffect(() => {
		const sign_in_btn = document.querySelector("#sign-in-btn");
		const sign_up_btn = document.querySelector("#contact-us-btn");
		const container = document.querySelector(".container");

		sign_up_btn.addEventListener("click", () => {
			container.classList.add("sign-up-mode");
		});

		sign_in_btn.addEventListener("click", () => {
			container.classList.remove("sign-up-mode");
		});
	}, []);

	return (
		<div className="login-page">
			<div className="container">
				<div className="forms-container">
					<div className="signin-signup">
						<div className="sign-in-form">
							<h2 className="title">Sign in</h2>
							<div className="input-field">
								<i className="fas fa-user"></i>
								<input type="email" placeholder="Email" />
							</div>
							<div className="input-field">
								<i className="fas fa-lock"></i>
								<input type="password" placeholder="Password" />
							</div>
							<input
								type="button"
								value="Login"
								className="btn solid"
								onClick={() => mainCtx.setCurrentPage("dashboard")}
							/>
						</div>
						<form action="/success.html" className="contact-us">
							<h2 className="title">Contact us</h2>
							<div className="input-field">
								<i className="fas fa-user"></i>
								<input type="email" placeholder="Email" />
							</div>
							<div className="input-field">
								<i className="fas fa-envelope"></i>
								<input type="text" placeholder="Message" />
							</div>
							<input type="submit" className="btn" value="Send" />
						</form>
					</div>
				</div>

				<div className="panels-container">
					<div className="panel left-panel">
						<div className="content">
							<h3>Sovos Hackathon | Team 8</h3>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Debitis, ex ratione. Aliquid!
							</p>
							<button className="btn transparent" id="contact-us-btn">
								Contact Us
							</button>
						</div>
						<img src="assets/img/login.svg" className="image" alt="" />
					</div>
					<div className="panel right-panel">
						<div className="content">
							<h3>Need Help?</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
								laboriosam ad deleniti.
							</p>
							<button className="btn transparent" id="sign-in-btn">
								Sign in
							</button>
						</div>
						<img src="assets/img/register.svg" className="image" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}
