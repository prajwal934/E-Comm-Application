import axios from "axios";
import React, { useEffect, useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccess , setLoginSuccess] = useState(false);
  const [userData, setuserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleSubmit = () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }

    // If all inputs are valid, submit the form
    if (
      
      emailRegex.test(email) &&
      passwordRegex.test(password)
    ) {
      console.log("Form submitted:", {email, password });
    }
  };

  useEffect(() => handleSubmit(), [email, password])

  const handelLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/ecom/v1/login" , {
        username: email,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      alret("Login successfully:" , response.data);
      setuserData(response.data);
      setLoginSuccess(true);

      // fields and error messages
      setEmail("");
      setPassword("");
      setErrorMessage(null);
    } catch (error) {
      console.error("Login error:" , error.response.data.messages);
      setErrorMessage(error.response.data.messages);
    }
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96">
        <h2 className="text-2xl font-semibold mb-6">Please Login first</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-mono">
            Enter Your Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full  py-1.5 text-sm shadow-sm placeholder:text-gray-800 focus:border-b-2 border-b-2 border-transparent
             hover:border-b-2 focus:border-slate-200 hover:border-slate-200  focus:outline-none"
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-mono">
            Enter Your Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full  py-1.5 text-sm shadow-sm placeholder:text-gray-800 focus:border-b-2 border-b-2
             border-transparent hover:border-b-2 focus:border-slate-300 hover:border-slate-300  focus:outline-none"
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
          {loginSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Login successful!</strong>
            <pre className="mt-2">{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
        </div>
        <button
          type="button"
          onClick={handelLogin}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
