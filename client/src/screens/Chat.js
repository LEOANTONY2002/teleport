import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { msgListAction, sendAction } from "../actions/chatAction";
import "./Chat.css";
import FileBase64 from "react-file-base64";

const socket = io.connect("https://localhost:8080");

function Chat() {
  const user = useSelector((state) => state.user);
  const mes = useSelector((state) => state.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState();
  const [photo, setPhoto] = useState(null);
  const [room, setRoom] = useState();

  let arr = [];

  useEffect(() => {
    document.getElementById("mlist").scrollTop = 5000000;

    let r = [user?.user?.user?.email, mes?.curUser?.email];
    r.sort();
    setRoom(r);

    socket.emit("join", r);
  }, []);

  useEffect(() => {
    msgListAction(dispatch, {
      from: user?.user?.user?._id,
      to: mes?.curUser?._id,
    });
  }, []);

  useEffect(() => {
    document.getElementById("mlist").scrollTop = 5000000;

    socket.on("receive", (data) => {
      msgListAction(dispatch, {
        from: user?.user?.user?._id,
        to: mes?.curUser?._id,
      });
    });
  }, [socket]);

  const send = async () => {
    await sendAction(dispatch, {
      msg,
      from: user?.user?.user?._id,
      to: mes?.curUser?._id,
      photo,
    });

    setMsg("");

    document.getElementById("mlist").scrollTop = 5000000;

    socket.emit("send", room);
  };

  return (
    <div className="clist">
      <header>
        <div>
          <img
            src={
              mes?.curUser?.photo
                ? mes?.curUser?.photo
                : "https://img.icons8.com/small/37/610480/user.png"
            }
            style={mes?.curUser?.photo && { padding: "2px", width: "40px" }}
            alt=""
          />
          <div>
            <p>{mes?.curUser?.name}</p>
            <span>{mes?.curUser?.email}</span>
          </div>
        </div>
      </header>

      <div className="mes-list">
        <div id="mlist" className="mlist">
          {mes?.messageList?.map((m) => (
            <div
              key={m?._id}
              className={m?.from === user?.user?.user?._id ? "right" : ""}
            >
              {arr.find((a) => a === (m?.createdAt).slice(0, 10)) ? (
                <></>
              ) : (
                arr.push((m?.createdAt).slice(0, 10)) && (
                  <div className="date">
                    <p>{(m?.createdAt).slice(0, 10)}</p>
                  </div>
                )
              )}
              {m?.photo ? (
                <>
                  <img src={m?.photo.toString("base64")} alt="" />
                </>
              ) : (
                <></>
              )}
              <p>{m?.msg}</p>
              <span>{(m?.createdAt).slice(11, 16)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="send">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Say here..."
          />
          <div className="cam">
            <img
              src="https://img.icons8.com/small/24/ffffff/camera.png"
              alt=""
            />
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPhoto(base64)}
            />
          </div>
        </div>
        <img
          onClick={send}
          src="https://img.icons8.com/small/37/ffffff/sent.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Chat;
