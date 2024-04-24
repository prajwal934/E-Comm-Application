import React, { useState } from "react";

const OTPVerification = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    // Check if the value is numerical
    if (/^\d*$/.test(value)) {
      setOTP(value);
      setError("");
    } else {
      setError("OTP should contain only numerical characters");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate OTP length
    if (otp.length !== 6) {
      setError("OTP should be 6 digits long");
      return;
    }
    // Perform OTP verification logic here, like making an API call
    console.log("Verifying OTP:", otp);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">OTP Verification</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            Enter OTP:
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleChange}
            className={`mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md ${error && "border-red-500"}`}
            placeholder="Enter OTP"
            maxLength={6}
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
