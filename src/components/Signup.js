import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/createuser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    let json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert(
        `Welcome ${credentials.name}, You have successfully signed in `,
        "success"
      );
      navigate("/");
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
        <h1 className="text-center">Sign Up</h1>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              required
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
