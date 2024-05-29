import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      userName,
      email,
      password,
      phoneNumber,
      roles: ["Manager", "User"],
    };

    const { data } = await axios.post(
      "https://localhost:5001/api/authentication",
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log({ data });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={firstName}
          placeholder="FirstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="LastName"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          value={userName}
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={phoneNumber}
          placeholder="PhoneNumber"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
