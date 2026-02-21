"use client";

import { useAuth } from "../hooks/mutation/use-auth";

export default function Home() {
  const { loginMutation } = useAuth();

  const handleLogin = () => {
    loginMutation.mutate({
      email: "test@example.com",
      password: "password",
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
