"use client";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <span className="p-2 rounded bg-orange-500 text-black">{params.id}</span>
      <hr />
      <p>Profile Page</p>
    </div>
  );
}
