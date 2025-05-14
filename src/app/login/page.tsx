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
        <Image
          className="size-5"
          src="/icon.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <h1 className="form-title">WELCOME</h1>
        <div className="border w-fit  border-gray-500 rounded-full text-gray-500 !mb-10" >
          <div className="flex items-center gap-2 !px-1">
            <div className="size-5">
              <svg
                className="size-full"
                aria-hidden="true"
                fill="currentColor"
                focusable="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="https://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z"></path>
              </svg>
            </div>

            <h2 className="text-xs text-black mb-4"> {email}</h2>
            <div>
              <svg
                aria-hidden="true"
                fill="currentColor"
                focusable="false"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="https://www.w3.org/2000/svg"
              >
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </div>
          </div>
        </div>

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
          <a
            href="https://forms.gle/WrDA4y2nCnNe9bpe7"
            className="form-button !rounded-full !text-white"
          >
            Next
          </a>
        </div>
      </form>
    </div>
  );
}
