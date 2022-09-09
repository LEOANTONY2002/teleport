import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { chatListAction } from "../actions/chatAction";
import { Axios } from "../axios";
import "./ChatList.css";

function ChatList() {
  const user = useSelector((state) => state.user);
  const chatList = useSelector((state) => state.chatList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [findUser, setFindUser] = useState([]);
  const [srch, setSearch] = useState(false);

  console.log(chatList?.chatList);

  useEffect(() => {
    chatListAction(dispatch, {
      from: user?.user?.user?._id,
    });
  }, [user]);

  const search = async () => {
    const { data } = await Axios.post("/chat/findUser", { email: email });
    setFindUser(data);
  };

  const chat = async (u) => {
    await dispatch({
      type: "CURUSER",
      payload: u,
    });
    navigate("/chat");
  };

  return (
    <div className="clist">
      <header>
        <div>
          <img
            onClick={() => navigate("/profile")}
            src={
              user?.user?.user?.photo
                ? user?.user?.user?.photo
                : "https://img.icons8.com/small/37/610480/user.png"
            }
            style={user?.user?.user?.photo && { padding: "2px", width: "40px" }}
            alt=""
          />
          <div>
            <p>{user?.user?.user?.name}</p>
            <span>{user?.user?.user?.email}</span>
          </div>
        </div>
        <img
          src="https://img.icons8.com/fluency-systems-filled/37/a113e3/search.png"
          alt=""
          onClick={() => (srch ? setSearch(false) : setSearch(true))}
        />
      </header>

      {srch && (
        <div className="search">
          <div className="srch">
            <img
              src="https://img.icons8.com/fluency-systems-filled/48/a113e3/delete-sign.png"
              alt=""
              onClick={() => setSearch(false)}
            />
            <div className="s-header">
              <p>Search</p>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Find here..."
                />
                <img
                  onClick={search}
                  src="https://img.icons8.com/fluency-systems-filled/37/a113e3/search.png"
                  alt=""
                />
              </div>
            </div>
            <div className="s-body">
              {findUser.length !== 0 ? (
                findUser?.error ? (
                  <span>No user found</span>
                ) : (
                  <div
                    style={{ height: "200px !important" }}
                    onClick={() => chat(findUser?.user)}
                  >
                    <img
                      src={
                        findUser?.user?.photo
                          ? findUser?.user?.photo
                          : "https://img.icons8.com/small/37/610480/user.png"
                      }
                      style={
                        findUser?.user?.photo && {
                          padding: "2px",
                          width: "40px",
                        }
                      }
                      alt=""
                    />
                    <div>
                      <p>{findUser?.user?.name}</p>
                      <span>{findUser?.user?.email}</span>
                    </div>
                  </div>
                )
              ) : (
                <section className="no-user"> Meet the world</section>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="lst">
        {chatList?.chatList?.length !== 0 ? (
          <div className="list">
            {chatList?.chatList?.map((c) =>
              c?.from?._id !== user?.user?.user?._id &&
              c?.to?._id === user?.user?.user?._id ? (
                <div
                  className="l-item"
                  style={{ margin: "10px 0" }}
                  onClick={() => chat(c?.from)}
                >
                  <div className="li-cont">
                    <img
                      src={
                        c?.from?.photo
                          ? c?.from?.photo
                          : "https://img.icons8.com/small/37/610480/user.png"
                      }
                      alt=""
                      style={
                        c?.from?.photo && { padding: "2px", width: "40px" }
                      }
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className="li-name">
                        <p>{c?.from?.name}</p>
                        <span>{c?.from?.email}</span>
                      </div>
                      <p className="li-msg">{c?.msg}</p>
                    </div>
                  </div>
                  <p>{(c?.createdAt).slice(0, 10)}</p>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        ) : (
          <p>No Chats found!</p>
        )}
      </div>
    </div>
  );
}

export default ChatList;
