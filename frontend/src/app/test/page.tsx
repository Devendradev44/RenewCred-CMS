"use client";

import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";

export default function Test() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(loginSuccess("abc123"))}
      className="bg-black text-white p-4"
    >
      Test Redux
    </button>
  );
}