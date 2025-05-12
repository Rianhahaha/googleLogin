"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkbox = checkboxRef.current;
    const password = passwordRef.current;

    if (checkbox && password) {
      const handleClick = () => {
        password.type = password.type === "password" ? "text" : "password";
      };
      checkbox.addEventListener("click", handleClick);
      return () => checkbox.removeEventListener("click", handleClick);
    }
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) setEmail(storedEmail);
  }, []);
  

  return (
    <div className="box">
      <form className="form">
        <Image className="size-5" src="/icon.png" alt="Logo" width={50} height={50} />
        <h1 className="form-title">WELCOME</h1>
        <h2 className="text-lg mb-4">Hi, {email}</h2>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            required
            id="txtPassword"
            ref={passwordRef}
          />
          <label className="form-label">Enter Your Password</label>
        </div>

        <div className="form-group">
          <label className="showLabel flex gap-2">
            <input type="checkbox" id="show" ref={checkboxRef} />
            Show Password
          </label>
        </div>

        <div className="bottom-box">
          <a href="#">Forget password?</a>
          <a href="https://forms.gle/BUYxhFZKdBiS4i9A7" className="form-button !rounded-full !text-white">Next</a>
        </div>
      </form>
    </div>
  );
}
