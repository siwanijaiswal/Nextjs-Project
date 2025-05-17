"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    userName: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.userName.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("singup sucess", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen py-4 px-4 bg-gray-500">
      <div className="flex flex-col p-6 rounded-lg shadow-md bg-white w-2/6">
        <h2> {loading ? "Processing" : "Signup"}</h2>
        <h1 className="font font-bold text-2xl text-blue-400 text-center">
          SignUp
        </h1>

        <label htmlFor="username" className="mb-2">
          User Name
        </label>
        <input
          className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
          type="text"
          id="username"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="Password" className="mb-2">
          Password
        </label>
        <input
          className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
          type="text"
          id="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <div className="flex flex-center flex-col gap-2 w-full items-center justify-center">
          <button
            type="submit"
            onClick={onSignUp}
            disabled={buttonDisabled}
            className={`px-4 py-2 rounded-lg border-2 ${
              buttonDisabled
                ? " cursor-not-allowed bg-gray-300"
                : "cursor-pointer border-blue-400 text-lg hover:bg-blue-300  hover:border-blue-300 hover:text-white  "
            }`}
          >
            Signup
          </button>
          <Link href="/login">Already have an account, Login here</Link>
        </div>
      </div>
    </div>
  );
}
