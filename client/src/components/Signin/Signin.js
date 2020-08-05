import React, { useState } from 'react';
import {getLsKey, userLogin} from '../../AuthService';
import './Signin.css';
import { withRouter, Link, useHistory } from "react-router-dom";

const Signin = () => {
	const [state, setState] = useState({
		email: "",
		password: ""
	});

	let history = useHistory();

	const handleValueChange = (e) => {
		const { name, value } = e.target;
		setState(() => ({
			...state,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		userLogin(state)
			.then(res => {
				if (res.status === 200) {
					localStorage.setItem(getLsKey(), JSON.stringify(res.data.message.name));
					history.push('/profile');
				}
			})
			.catch(error => {
				alert('Error in User Input Please check!');
			});
	};

	const { email, password } = state;
	return (
		<div className="login-form">
			<div className="container">
				<div className="row">
					<div className="form-box offset-md-3 col-md-6">
						<h2>Login</h2>
						<form method="post" className="">
							<div className="form-group">
								<label>Email:</label>
								<input type="text" name="email" placeholder="Please Enter Email" value={email} className="form-control" onChange={handleValueChange} />
							</div>
							<div className="form-group">
								<label>Password:</label>
								<input type="password" name="password" placeholder="Please Enter Password" value={password} className="form-control" onChange={handleValueChange} />
							</div>
							<div className="button">
								<input type="submit" className="submit btn btn-primary" value="Login" onClick={handleSubmit} />
								<p className="p-login">Not Signed Up Yet? <Link to="/" className="p-a">Signup</Link></p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
};

export default withRouter(Signin);
