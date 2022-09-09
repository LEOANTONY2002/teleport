import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, signupAction } from "../actions/userAction";
import { Axios } from "../axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import FileBase64 from "react-file-base64";

function Login() {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const dispatch = useDispatch();
  const logUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(logUser);

  useEffect(() => {
    if (logUser?.user?.error === false) navigate("/chatlist");
  }, [logUser, navigate]);

  const signup = async () => {
    await signupAction(dispatch, user);
    navigate("/chatlist");
  };

  const loginn = async () => {
    await loginAction(dispatch, user);
    navigate("/chatlist");
  };

  return (
    <div>
      {login ? (
        <div className="login">
          <img
            src="https://img.icons8.com/fluency-systems-filled/114/a113e3/user.png"
            alt=""
          />
          <input
            type="text"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span>{logUser?.user?.error === true && logUser?.user?.msg}</span>
          <button onClick={loginn}>Login</button>
          <div className="or">
            <span></span>
            <p>or</p>
            <span></span>
          </div>
          <p onClick={() => setLogin(false)}>Signup</p>
        </div>
      ) : (
        <div className="login">
          <div className="photo">
            <img
              src={
                user?.photo === null
                  ? "https://img.icons8.com/small/114/ffffff/user.png"
                  : user?.photo
              }
              alt=""
            />
            <div className="camera">
              <img
                src="https://img.icons8.com/small/37/610480/camera.png"
                alt=""
              />
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) => setUser({ ...user, photo: base64 })}
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span>{logUser?.user?.error === true && logUser?.user?.msg}</span>
          <button onClick={() => signup()}>Signup</button>
          <div className="or">
            <span></span>
            <p>or</p>
            <span></span>
          </div>
          <p onClick={() => setLogin(true)}>Login</p>
        </div>
      )}
    </div>
  );
}

export default Login;
