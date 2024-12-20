import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import loginpicImageUrl1 from "../../img/pl1.jpg";
import { useNavigate, Link } from "react-router-dom";
export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [passw, setPassw] = useState("")
	const [rpassw, setRPassw] = useState("")
	const [email, setEmail] = useState(store.user["email"])
	const [userName, setUserName] = useState(store.user["username"])
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const profileFetch = () => {
		if(userName!="")
		fetch(store.urlFetchApi + '/profile', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization":'Bearer '+ localStorage.getItem('jwt-token')
			},
			body: JSON.stringify({ "username": userName, "email": email, "password": passw, "rpassword": rpassw ,"id":store.user["id"]}),
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				if (data["errors"]){
					setError(Object.entries(data["errors"]))
					setMessage("")
				}
				if(data["message"]){
					setMessage(Object.entries(data))
					setError("")
				}
				actions.setUser(localStorage.getItem('id'))
				console.log(data);
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
					{
					message!=""?
						message.map((mess, index) => (
							<li key={index} className="list-group-item list-group-item-success alertlg">{mess[1]}</li>
						))
						: ""
					}
					<div className="col-lg-2"></div>
					<div className="col-lg-8 col-sm-12 row justify-content-center content">
						<div className="col-lg-6 col-sm-6 content">
							<h2 className="sitename">{store.user["username"]} Profile</h2>
							<div className="form-floating form-group">
								<input type="text" className="form-control border-0 border-bottom border-success shadow-none text-success fw-bold ginput"
									value={userName||""}
									onChange={(e) => { setUserName(e.target.value) }}
									id="floatingInput1" placeholder="name@example.com" required />
								<label className="glabel" htmlFor="floatingInput1">Username</label>
							</div>
							<div className="form-floating form-group">
								<input type="email" className="form-control border-0 border-bottom border-success shadow-none text-success fw-bold ginput"
									value={email||""}
									onChange={(e) => { setEmail(e.target.value) }}
									id="floatingInput" placeholder="name@example.com" required />
								<label className="glabel" htmlFor="floatingInput">Email</label>
							</div>
							<div className="form-floating form-group">
								<input type="password" className="form-control border-0 border-bottom border-success shadow-none text-success fw-bold ginput"
									onChange={(e) => { setPassw(e.target.value) }}
									id="floatingPassword" placeholder="Password" required />
								<label className="glabel" htmlFor="floatingPassword">New Password</label>
							</div>
							<div className="form-floating form-group">
								<input type="password" className="form-control border-0 border-bottom border-success shadow-none text-success fw-bold ginput"
									onChange={(e) => { setRPassw(e.target.value) }}
									id="floatingPassword" placeholder="Password" required />
								<label className="glabel" htmlFor="floatingPassword">Repeat Password</label>
							</div>
							<button className="btn btn-success rbuttom" onClick={() => profileFetch()} >Update</button>
							<div className="text-center pb-4 mt-4 link">
								<Link to="/dashboard">Go Dashboard</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-2"></div>
				</div>
			</div>
		</section>
	);
};