import React, { useEffect, useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [image, setImage] = useState<File>();

  useEffect(() => {
    console.log({ userName, password, image });
  }, [userName, password, image]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("from handleFormSubmit");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={userName}
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
