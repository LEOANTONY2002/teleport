import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import ChatList from "./screens/ChatList";
import Chat from "./screens/Chat";
import Profile from "./screens/Profile";

function App() {
  const user = useSelector((state) => state.user);
  const curUser = useSelector((state) => state.msg.curUser);

  console.log("LOGIN  ... ", user?.user?.user);
  console.log("CURUSER  ... ", curUser);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />{" "}
          <Route
            path="/profile"
            element={
              user.length === 0 ? (
                <Login />
              ) : user?.user?.error === false ? (
                <Profile />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/chatlist"
            element={
              user.length === 0 ? (
                <Login />
              ) : user?.user?.error === false ? (
                <ChatList />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/chat"
            element={
              user.length === 0 ? (
                <Login />
              ) : user?.user?.error === false ? (
                curUser.length !== 0 ? (
                  <Chat />
                ) : (
                  <ChatList />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/"
            element={
              <>
                <main>
                  <div className="teleport">
                    <h1>Teleport</h1>
                  </div>
                  <section>
                    {user.length === 0 ? (
                      <Login />
                    ) : user?.user?.error === false ? (
                      <ChatList />
                    ) : (
                      <Login />
                    )}
                  </section>
                </main>
              </>
            }
          />
        </Routes>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
