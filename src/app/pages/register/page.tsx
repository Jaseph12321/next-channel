"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createUser } from "../../controller/userController";
import { createUserData } from "../../model/model";
import "../register/register.scss";

const RegisterPage: React.FC = ({}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Save username to localStorage for access on other pages
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: createUserData = {
      id,
      name,
      age,
      email,
    };

    try {
      createUser(newUser);
      router.push("/");
    } catch (e) {
      console.log(e);
      throw new Error(String(e));
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userId">id:</label>
          <input
            required
            id="userId"
            type="text"
            maxLength={10}
            placeholder="custom your id with 10 characters"
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor="username">Name:</label>
          <input
            required
            id="username"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="userAge">Age:</label>
          <input
            required
            id="userAge"
            type="number"
            min={0}
            max={100}
            placeholder="your age"
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <label htmlFor="userEmail">UserEmail:</label>
          <input
            required
            id="userEmail"
            type="email"
            placeholder="please type your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {/* {message && <p style={{ marginTop: 16 }}>{message}</p>} */}
      </div>
    </>
  );
};

export default RegisterPage;
