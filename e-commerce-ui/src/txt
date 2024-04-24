import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false); // Track login success
  const [userData, setUserData] = useState(null); // Store user data

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!enteredEmail.match(emailPattern)) {
      setEmailError("Please Enter A Valid Email Address.");
    } else {
      setEmailError("");
    }
    setEmail(enteredEmail);
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/login", {
        userName: email, // Assuming email is used as the username
        password: password
      });

      // Handle successful login
      console.log("Login successful:", response.data);
      setUserData(response.data); // Store user data
      setLoginSuccess(true); // Set login success state

      // Reset form fields and error messages
      setEmail("");
      setPassword("");
      setErrorMessage(null);
    } catch (error) {
      // Handle login failure
      console.error("Login error:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-md max-w-xl w-full max-h-fit hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Login Form</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="border border-gray-400 rounded-md px-3 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
        />
        {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="border border-gray-400 rounded-md px-3 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
        />
        {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
        {loginSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Login successful!</strong>
            <pre className="mt-2">{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
        <button
          onClick={handleLogin}
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-md px-4 py-2 w-full font-bold"
        >
          Login
        </button>
        <p className="text-gray-600 mt-4">
          <span className="text-blue-500 font-bold">
            <Link to="/register">New to Flipkart? &nbsp; Create an account</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
