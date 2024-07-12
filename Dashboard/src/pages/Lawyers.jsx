import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import logoImage from "../assets/LogoDark.png";

function Lawyers() {
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/v1/user/lawyers', { withCredentials: true });
                setLawyers(data.lawyers);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetchLawyers();
    }, []);

    return (
        <div className="md:ml-64 max-w-screen h-full bg-gray-200 pb-8">
            <div className="flex items-center mx-4">
                <img className="h-16 w-16" src={logoImage} alt="Logo" />
                <h1 className="uppercase text-3xl p-6 font-bold">Lawyers</h1>
            </div>

            <div className="flex flex-wrap justify-center">
                {
                    lawyers && lawyers.length > 0 ? (
                        lawyers.map((lawyer) => (
                            <div key={lawyer._id} className="flex flex-col items-center p-4 bg-white m-4 rounded-xl shadow-xl w-full sm:w-64 transform transition-transform duration-2000 hover:scale-105">
                                <img src={lawyer.lawAvatar.url} alt="Lawyer Avatar" className="h-48 w-48 rounded-full object-cover mb-4" />
                                <h1 className="text-lg font-semibold mb-2">{lawyer.firstName} {lawyer.lastName}</h1>
                                <div className="flex items-center gap-2 mb-2">
                                    <FaPhoneAlt className="text-gray-600" />
                                    <span>{lawyer.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <IoMdMail className="text-gray-600" />
                                    <span>{lawyer.email}</span>
                                </div>
                                <h2 className="text-gray-700"><span className="font-semibold">Department: </span>{lawyer.lawyerDepartment}</h2>
                            </div>
                        ))
                    ) : <h1> No Registered Lawyers found</h1>
                }
            </div>
        </div>
    );
}

export default Lawyers;
