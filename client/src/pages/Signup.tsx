/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { useState } from "react";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  console.log(backendUrl);
  const navigate = useNavigate();
  const handleSignup = async (a: React.FormEvent) => {
    a.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/auth/signup`, {
        username,
        password,
        role,
      });

      console.log(response);
      if (response.status == 200) {
        console.log("Signup successful:", response.data);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      console.error("Signup failed:", error);
    }
  };
  return (
    <div>
      <form className="max-w-md mx-auto relative top-10">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            onChange={(e) => setUsername(e.target.value)}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            onChange={(e) => setPassword(e.target.value)}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6"></div>

        <div className="relative z-0 w-full mb-5 group">
          <label className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Are you a Teacher or Student?
          </label>
          <div className="flex space-x-6 mt-2">
            <div>
              <input
                type="radio"
                id="teacher"
                onChange={(e) => setRole(e.target.value)}
                name="role"
                value="Teacher"
                className="mr-2"
                required
              />
              <label htmlFor="teacher" className="text-sm text-black">
                Teacher
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="student"
                name="role"
                value="Student"
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
                required
              />
              <label htmlFor="student" className="text-sm text-black">
                Student
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSignup}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
