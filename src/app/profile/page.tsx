"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/signup");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("data is", res.data.data._id);
      setData(res.data.data._id);
    } catch (error: any) {}
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <p>Profile</p>
      <hr />
      <p>Profile Page</p>
      <p>
        Data is{" "}
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </p>
      <hr />
      <button className="bg-red-400 cursor-pointer" onClick={logout}>
        Logout
      </button>
      <button className="bg-red-400 cursor-pointer" onClick={getUserDetails}>
        GetUserDetails
      </button>
    </div>
  );
}
