"use client";
import React, { useEffect } from "react";
import { useUser } from "../hooks/userContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user, logout } = useUser();

  const router = useRouter();
console.log(user)
  useEffect(() => {
    if (!user || user === null || undefined) {
      router.push("/");
    }
  }, []);

  const signOut = (e: any) => {
    e.preventDefault();
    logout(null);
    router.push('/')
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#EEEEEE] ">
      <div className=" w-[40%] flex flex-col rounded-xl border   justify-center items-center">
        <h2 className="text-3xl mb-5 ">Welcome!! <p className="text-red-600">{user && user.email}</p>  </h2>
        <div className="flex justify-center items-center">
        <p>Click here to</p>  <button className="rounded-xl ml-4 bg-blue-400 p-3" onClick={signOut}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
