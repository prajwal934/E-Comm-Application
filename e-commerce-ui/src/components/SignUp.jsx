// import React from "react";


// const SignUp = () => {

  

//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form className="space-y-6">
//           <div>
//             <div className="mt-8">
//               <input
//                 id="password"
//                 name="password"
//                 type="text"
//                 placeholder="Enter Your Name: "
//                 required
//                 className="block w-full  py-1.5 text-sm shadow-sm placeholder:text-gray-800 focus:border-b-2 border-b-2 border-transparent hover:border-b-2 focus:border-slate-200 hover:border-slate-200  focus:outline-none"
//               />
//             </div>
//           </div>
//           {/*  for email*/}
//           <div className="">
//             <div className="mt-8">
//               <input
//                 id="password"
//                 name="password"
//                 type="text"
//                 placeholder="Enter your email"
//                 required
//                 className="block w-full  py-1.5 text- shadow-sm placeholder:text-gray-800 focus:border-b-2 border-b-2 border-transparent hover:border-b-2 focus:border-slate-200 hover:border-slate-200  focus:outline-none"
//               />
//             </div>
//           </div>
//           {/* for password */}
//           <div>
//             <div className="mt-8">
//               <input
//                 id="password"
//                 name="password"
//                 type="text"
//                 placeholder="Enter Mobile Number"
//                 required
//                 className="block w-full  py-1.5 text-sm shadow-sm placeholder:text-gray-800 focus:border-b-2 border-b-2 border-transparent hover:border-b-2 focus:border-slate-200 hover:border-slate-200  focus:outline-none"
//               />
//             </div>
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="flex w-full space-x-2 justify-center  bg-orange-500 px-3 py-1.5 text-xl font-bold leading-6 text-white shadow-sm"
//             >
//               CONTINUE
//             </button>
//           </div>

//           <p className="mt-10 text-center text-sm text-gray-500">
//             By continuing, you agree to Flipkart's Terms of Use and Privacy
//             Policy.
//           </p>

//           <div>
//             <button
//               type="submit"
//               className="flex w-full space-x-4 justify-center bg-slate-100 px-3 py-1.5 text-sm font-semibold leading-6 text-blue-700 shadow-sm"
//             >
//               Existing User? Log in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
   
//   );
// };

// export default SignUp;

import React from 'react'
import Register from '../Public/Register'

const SignUp = () => {
  return (
    <div>
      <Register/>
    </div>
  )
}

export default SignUp
