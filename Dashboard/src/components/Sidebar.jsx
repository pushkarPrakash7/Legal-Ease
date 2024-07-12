import { useContext, useState } from "react";
import { Context } from "../main";
import { IoClose } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import LogoImage from "../assets/Logo.png";
import axios from "axios";
import { toast } from "react-toastify";
function SidebarComponent() {
    const [showSidebar, setShowSidebar] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const handleLogout = async () => {
        try {
          await axios
            .get("http://localhost:4000/api/v1/user/admin/logout", { withCredentials: true })
            .then((res) => {
              toast.success(res.data.message);
              setIsAuthenticated(false);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        } catch (error) {
          toast.error("An error occurred during logout. Please try again.");
        }
      };
    return (
        <div className={` ${!isAuthenticated ? "hidden" : "flex"} bg-gray-200`} >
            <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="px-3 py-4 overflow-y-auto bg-gray-600 h-screen">
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="md:hidden absolute top-3 right-3 p-2 text-gray-100 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <span className="sr-only">Close sidebar</span>
                        <IoClose className="w-6 h-6" />
                    </button>
                    <a href="/" className="flex items-center ps-2.5 mb-5">
                        <img src={LogoImage} className="h-8 me-3 sm:h-7" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-100">LegalEase</span>
                    </a>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="/" className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-100 hover:text-black group">
                                <svg className="w-5 h-5 text-gray-100 transition duration-75  group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/resources" className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-100 hover:text-black group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-100 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Resources</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </a>
                        </li>
                        <li>
                            <a href="/messages" className="flex items-center p-2 text-gray-100  rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-100  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                            </a>
                        </li>
                        <li>
                            <a href="/lawyers" className="flex items-center p-2 text-gray-100  rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-100  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.5 1a7.5 7.5 0 0 0-.67 14.966c-.004.285-.016.696-.091 1.024-.08.346-.2.652-.348.928H5.89c-1.068 0-1.938-.633-2.38-1.55-.458-.95-.594-2.198-.594-3.368v-.585c0-.407.108-.765.295-1.056.196-.303.495-.56.871-.746a1 1 0 0 0 .479-.514C4.924 9.854 5 9.522 5 9c0-.713.193-1.315.553-1.79C5.877 6.764 6.427 6.5 7 6.5h6c.573 0 1.123.264 1.447.71.36.475.553 1.077.553 1.79 0 .522.076.854.349 1.128a1 1 0 0 0 .48.514c.376.186.675.443.871.746.187.291.295.65.295 1.056v.585c0 1.17-.136 2.417-.594 3.368-.442.917-1.312 1.55-2.38 1.55h-1.5c-.148-.276-.268-.582-.348-.928-.075-.328-.087-.739-.091-1.024A7.5 7.5 0 0 0 8.5 1Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Lawyers</span>
                            </a>
                        </li>
                        <li>
                            <a href="/lawyer/addnew" className="flex items-center p-2 text-gray-100  rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-100  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M15 0H3a3 3 0 0 0-3 3v17a.999.999 0 0 0 1.447.894L9 17.618l7.553 3.276A1 1 0 0 0 18 20V3a3 3 0 0 0-3-3ZM6 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm4 5H8a1 1 0 0 1-1-1 .999.999 0 0 1 1-1h2a1 1 0 0 1 1 1c0 .552-.447 1-1 1Zm2-5a1 1 0 0 1-1-1 1 1 0 0 1 2 0 1 1 0 0 1-1 1Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Add New Lawyer</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/addnew" className="flex items-center p-2 text-gray-100  rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group">
                                <RiAdminFill className="text-2xl" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add New Admin</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={handleLogout} className="cursor-pointer flex items-center p-2 text-gray-100  rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-100  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M9 18a1 1 0 0 1-.47-.116l-6-3A1 1 0 0 1 2 14V6a1 1 0 0 1 .53-.884l6-3a1 1 0 0 1 .94 0l6 3A1 1 0 0 1 16 6v8a1 1 0 0 1-.53.884l-6 3A1 1 0 0 1 9 18Zm-5-4.382 5 2.5 5-2.5V7.382l-5-2.5-5 2.5V13.618Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default SidebarComponent;
