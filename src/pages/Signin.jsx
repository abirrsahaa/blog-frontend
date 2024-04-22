import React, { useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setting } from "../store/tokenSlice";

const Signin = () => {
  //   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();

  const SigningIn = async (email, password) => {
    try {
      const formData = new FormData();
      // formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        formData
      );

      console.log(response.data);
      if (response.data.success) {
        console.log(response.data.token);

        dispatch(setting(response.data.token));
        setUser(true);
        alert("User logged in  successfully");
      } else {
        alert("User not able to sign in!");
      }

      return response.data;
    } catch (error) {
      console.error("Error creating signing in ", error);
      throw error;
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-gray-900 flex justify-center items-center text-white shadow-[5000px]">
      <div className="w-[85%] h-[95%] p-5  bg-white text-black rounded-2xl flex justify-center items-center shadow-lg">
        <div className="w-full h-full  rounded-lg flex justify-between items-center p-3 shadow-3xl">
          <div className="w-[60%] h-full  rounded-lg bg-green-400">
            <img
              src="https://i.pinimg.com/564x/b4/1a/8a/b41a8acccf85813efcddf1d93061ecc6.jpg"
              alt="post"
              className="w-full h-full object-cover  object-center rounded-lg"
            />
          </div>
          <div className="w-[39%] h-[95%]   rounded-lg pt-2 flex flex-col  justify-center gap-2 items-center ">
            <div className="w-[90%] h-[10%]   font-semibold tracking-widest   flex justify-center items-end py-3 text-3xl">
              GET SET BLOG !!!
            </div>
            <div className="w-[90%] h-[75%]   py-3 flex flex-col justify-start items-center gap-6 ">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[80%] h-[50px] bg-white rounded-lg px-2 border-2 border-gray-400 border-solid shadow-lg"
              />
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[80%] h-[50px] bg-white rounded-lg px-2 border-2 border-gray-400 border-solid shadow-lg"
              />

              <button
                type="submit"
                onClick={() => {
                  SigningIn(email, password);
                }}
                className="w-[80%] h-[45px] bg-gray-900 rounded-lg text-white font-semibold text-2xl tracking-wider shadow-2xl hover:bg-gray-500 transition-all duration-300 ease-in-out"
              >
                SignIn
              </button>
              <span>
                Don't have an account?{" "}
                <Link to="/" className="font-bold underline">
                  Signup
                </Link>
              </span>
              {user && <Navigate to="/dashboard" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
