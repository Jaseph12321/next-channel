"use client";
import React, { useState } from "react";
import "./login.scss";
import { useRouter } from "next/navigation";
import { getUser } from "../../controller/userController";
import "../../model/model";
import Link from "next/link";
import { useUser } from "../../UserContext";

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useUser();

  // Save username to localStorage for access on other pages
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && userId.trim()) {
      const user = { id: userId, name: username };

      try {
        const userData = await getUser(user);
        console.log("userData: ",userData);

        if (!userData || !userData.id || !userData.name) {
          setMessage("Invalid user data. Please try again.");

          return;
        }

        login(userData);
        console.log("aaaaaaaaaaa" + userData);
        setMessage(`Welcome, ${username}!`);
        // Optionally redirect to another page
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    } else {
      setMessage("Please enter your username.");
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">UserId:</label>
          <input
            id="userid"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {message && <p style={{ marginTop: 16 }}>{message}</p>}
        <div>
          <p>
            don't know what's your account? Click{" "}
            <Link href="/pages/register" className="custom-link">
              here
            </Link>{" "}
            to register
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
