import { Outlet } from "react-router-dom"; // Assuming React Router v6
import Sidebar from "../components/Sidebar-user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const StudentDashboard = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />

      <div className="flex-grow flex flex-col ml-3">
        <div className="bg-white shadow-md p-4 mb-4 w-full z-10">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex items-center">
              <input
                type="search"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="ml-2 text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>

            {/* My Account */}
            <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900">
              <FontAwesomeIcon icon={faUser} />
              <span className="ml-2 font-medium">My Account</span>
            </div>
          </div>
        </div>

        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
