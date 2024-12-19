import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import loginpicImageUrl1 from "../../img/pl1.jpg";
import { useNavigate, Link } from "react-router-dom";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [passw, setPassw] = useState("")
	const [userName, setUserName] = useState("")
	const [error, setError] = useState("");

	const login = () => {
		fetch(store.urlFetchApi + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ "username": userName, "password": passw }),
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				if (data["error"])
					setError(Object.entries(data))
				else {
					console.log(data)
					actions.setUser(data.id)
					localStorage.setItem("jwt-token", data.token)
					localStorage.setItem("id", data.id)
					localStorage.setItem("user", data.username)
					navigate("/dashboard")
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	return (
		<section className="myform-area">
			<div className="container justify-content-center">
				<div className="row">
					{
						error != "" ?
							error.map((err, index) => (
								<li key={index} className="list-group-item list-group-item-danger alertlg">{err[1]}</li>
							))
							: ""
					}
					<div className="col-lg-2"></div>
					<div className="col-lg-8 col-sm-12 row justify-content-center content">
						<div className="col-lg-6 col-sm-6 content">
							<img className="logimg" src={loginpicImageUrl1} />
						</div>
						<div className="col-lg-6 col-sm-6 content">
							<h2 className="sitename">LeafyLove</h2>
							<div className="form-floating form-group">
								<input type="text" className="form-control border-0 border-bottom border-success shadow-none text-success fw-bold ginput"
									onChange={(e) => { setUserName(e.target.value) }}
									id="floatingInput" placeholder="name@example.com" required />
								<label className="glabel" htmlFor="floatingInput">Email or Nickname</label>
							</div>
							<div className="form-floating form-group">
								<input type="password" className="form-control border-0 border-bottom border-success shadow-none text-success fw-bold ginput"
									onChange={(e) => { setPassw(e.target.value) }}
									id="floatingPassword" placeholder="Password" required />
								<label className="glabel" htmlFor="floatingPassword">Password</label>
							</div>
							<button className="btn btn-success rbuttom" onClick={() => login()}>Login</button>
							<div className="text-center pb-4 mt-4">
								Don't have an account? <Link to="/signup">Signup</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-2"></div>
				</div>
			</div>
		</section>
	);
};
