import { Link } from "react-router-dom";
import gift_cards from "../Public/images/gift_cards.svg";
import flipkartplus from "../Public/images/flipkartplus.svg";
import orders from "../Public/images/orders.svg";

export default function ({ hovered = true }) {
  return (
    <div className={`${!hovered && "hidden"} z-10`}>
      <div className=" w-fit bg-white shadow-gray-400 shadow-xl absolute top-12 rounded-lg  ">
        <div className="flex  gap-16 border-b-2 p-4 hover:cursor-pointer">
          <div className="">New Customer?</div>
          <Link to="/customer/register">
            <div className="font-bold text-blue-600 ">Sign Up</div>
          </Link>
        </div>
        <div>
          <ul className="">
            <li className="flex py-2 hover:cursor-pointer hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline mx-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <p>My profile</p>
            </li>

            <li className="flex  py-2 hover:cursor-pointer hover:bg-gray-50">
              <img
                src={flipkartplus.svg}
                alt=""
                className="inline mx-3"
                width={"20px"}
              />
              <p>Flipkart Plus Zone</p>
            </li>

            <li className="flex  py-2 hover:cursor-pointer hover:bg-gray-50">
              <img
                src={orders.svg}
                alt=""
                className="inline mx-3"
                width={"20px"}
              />
              <p>Orders</p>
            </li>

            <li className="flex  py-2 hover:cursor-pointer hover:bg-gray-50">
              {/* <img
                  src="./images/wishlist.svg"
                  alt=""
                  className="inline mx-3"
                  width={"20px"}
                /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline mx-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>

              <p>Wishlist</p>
            </li>

            <li className="flex  py-2 hover:cursor-pointer hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline mx-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>

              <p>Rewards</p>
            </li>

            <li className="flex  py-2 hover:cursor-pointer hover:bg-gray-50">
              <img
                src={gift_cards.svg}
                alt=""
                className="inline mx-3"
                width={"20px"}
              />
              <p>Gift Cards</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
