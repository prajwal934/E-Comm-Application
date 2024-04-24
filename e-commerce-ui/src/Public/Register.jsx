import React, { useEffect, useState } from "react";
import axios from "axios";

const Register = ({ role }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [userRole, setUserRole] = useState(""); // State variable for user role

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   // userRole: "", // Include user role in user state
  // });

  // const {name ,email , password} = user;

  useEffect(() => setUserRole(role), []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/ecom/v1/register",
        {
          name,
          email,
          password,
          userRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === "202") {
        console.log(response);
        alert(response.data.message); // Access response data here
      }
    } catch (error) {
      alert(
        "Registration failed: ",
        error.response ? error.response.data : error.message
      );
    }

    // Reset errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    //     // Validation
    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!nameRegex.test(name)) {
      setNameError("Name should contain only alphabetical characters");
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }

    //     // If all inputs are valid, submit the form
    if (
      nameRegex.test(name) &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      role
    ) {
      // You can handle form submission here, like making an API call
      console.log("Form submitted:", { name, email, password, role });
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
    setName(newName);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <form onSubmit={handleSubmit} className="w-96  ">
        <h2 className="text-2xl font-bold justify-center flex mb-6">
          Registration
        </h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-mono">
            Enter Your Name:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="block w-full py-1.5 text-sm shadow-sm placeholder:text-gray-800 focus:border-b-2 border-b-2 border-transparent hover:border-b-2 focus:border-slate-200 hover:border-slate-200 focus:outline-none"
            required
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>
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
            className="block w-full py-1.5 text-sm shadow-sm placeholder:text-gray-800 focus:border-b-2 border-b-2 border-transparent hover:border-b-2 focus:border-slate-200 hover:border-slate-200 focus:outline-none"
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
            className="block w-full py-1.5 text-sm shadow-sm placeholder:text-gray-800 focus:border-b-2 border-b-2 border-transparent hover:border-b-2 focus:border-slate-300 hover:border-slate-300 focus:outline-none"
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
