import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./services/userSlice";

const Login = () => {
  const [email, setEmail] = useState("hhz@gmail.com");
  const [password, setPassword] = useState("asdffdsa");
  const [account, setAccount] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiLogin = async () => {
    const { data } = await axios.post(
      "http://go.contact.mmeducare.com/api/v1/login",
      { email, password }
    );
    console.log(data);
    if (data?.success) {
      navigate("/dashboard");
    }
    dispatch(login(data));
  };

  const onSubmitControl = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (isChecked) {
      localStorage.setItem("account", JSON.stringify({ email, password }));
    }
    apiLogin();
  };

  // useEffect(() => {
  //   console.log(isChecked);
  //   if (isChecked) {
  //     localStorage.setItem("account", JSON.stringify({ email, password }));
  //   } else {
  //     localStorage.removeItem("account");
  //   }
  // }, [isChecked]);

  useEffect(() => {
    const userAccount = localStorage.getItem("account");

    console.log(userAccount);
  }, []);
  return (
    <form className="col-6" onSubmit={onSubmitControl}>
      <h1>Login Account</h1>
      <input
        type="email"
        className="form-control my-5"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="form-control my-5"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="d-flex justify-content-start my-3 gap-2">
        <input
          type="checkbox"
          onChange={() => setIsChecked((pre) => !pre)}
          defaultChecked={isChecked}
        />
        <small>Remember Me</small>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Login;
