"use client";

import { useLogin } from "@repo/query";

export default function Home() {
  const { mutate: login } = useLogin();

  const handleLogin = () => {
    const payload = {
      email: "test@example.com",
      password: "password",
    };

    login(payload, {
      onSuccess: () => {
        console.log("Login successful");
      },
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
