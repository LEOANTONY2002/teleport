import React from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="profile">
      <div className="img">
        <img
          src={
            user?.user?.user?.photo
              ? user?.user?.user?.photo
              : "https://img.icons8.com/small/37/610480/user.png"
          }
          alt=""
        />
      </div>
      <p>{user?.user?.user?.name}</p>
      <span>{user?.user?.user?.email}</span>
      <div className="acts">
        <img
          onClick={() => navigate("/chatlist")}
          src="https://img.icons8.com/fluency-systems-filled/37/a113e3/left.png"
          alt=""
        />
        <img
          onClick={() => {
            window.location.reload();
          }}
          src="https://img.icons8.com/fluency-systems-filled/37/a113e3/exit.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Profile;
