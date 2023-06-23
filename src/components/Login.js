import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    let json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert(`You have successfully Loged in `, "success");
    } else {
      props.showAlert(`${json.error} `, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3 col-md-6">
        <h1 className="text-center">Log in</h1>
        <form onSubmit={handleClick}>
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              autoComplete="current-email"
              className="form-control"
              id="email"
              value={credentials.email}
              name="email"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              className="form-control"
              id="password"
              minLength={5}
              required
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="text-center">
            <button
              // disabled={note.title.length < 5 || note.description.length < 5}// this should'nt be done instead we can use onSubmit
              type="submit"
              className="btn btn-primary my-3"
              // onClick={handleClick}// this should'nt be done instead we can use onSubmit
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
