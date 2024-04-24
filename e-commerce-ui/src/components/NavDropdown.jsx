import helpcenter from "../Public/images/helpcenter.svg";


export default function ({ hovered = true, className }) {
  return (
    <div className={`${!hovered && "hidden"} z-10`}>
      <div
        className={` bg-white shadow-gray-400 shadow-xl absolute right-16 top-12 rounded-lg  ${className}`}
      >
        <div className="p-3">
          <ul className="">
            <li className="flex py-2 hover:cursor-pointer hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline me-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>

              <p>Notification Preferences</p>
            </li>

            <li className="flex  py-2 hover:cursor-pointer hover:bg-gray-50">
              <img
                src={helpcenter.svg}
                alt=""
                className="inline me-3"
                width={"20px"}
              />
              <p>24x7 Customer Care</p>
            </li>

            <li className="flex  py-2 hover:cursor-pointer hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className=" inline w-6 h-6 me-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>

              <p>Advertise</p>
            </li>

            <li className="flex  py-2 hover:cursor-pointer hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline me-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>

              <p>Download App</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
