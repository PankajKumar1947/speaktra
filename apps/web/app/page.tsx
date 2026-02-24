"use client";

import { useAuth } from "@repo/query";

export default function Home() {
  const { loginMutation } = useAuth();
  const { mutate: login } = loginMutation;

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
