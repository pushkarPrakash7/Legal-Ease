import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../main.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import dashboardImage from "../assets/Dashboard.png";
import logoImage from "../assets/LogoDark.png";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

function Dashboard() {
    const { isAuthenticated, user } = useContext(Context);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/appointment/getall", { withCredentials: true });
                setAppointments(response.data.appointments);
            } catch (error) {
                toast.error("Failed to fetch appointments");
            }
        };
        fetchAppointments();
    }, []);

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.put(`http://localhost:4000/api/v1/appointment/update/${appointmentId}`, { status }, { withCredentials: true });
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );
            toast.success(data.message);
        }
        catch (error) {
            toast.error("Failed to update appointment status");
        }
    }
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className="p-4 md:p-8 lg:p-12 relative">
            <div className="absolute -top-1 md:top-6 md:right-16">
                <img src={logoImage} className="h-20 w-20" alt="Logo" />
            </div>
            <div className="bg-gray-100 p-4 rounded-md shadow-md md:ml-64 mt-16">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <div className="flex items-center bg-blue-300 w-full md:w-2/3 p-4 lg:p-0 relative rounded-t-md md:rounded-l-md md:rounded-r-none">
                        <div className="relative h-32 w-32 md:h-36 md:w-48 mr-4">
                            <img
                                src={dashboardImage}
                                alt="User Avatar"
                                className="absolute h-48 -top-24 z-20 inset-0 object-cover rounded-full lg:-top-40 lg:left-2 lg:h-[400px]"
                            />
                        </div>
                        <div className="w-full md:w-2/3 md:ml-4 text-center md:text-left">
                            <h1 className="text-2xl font-semibold">Hello, <span className="text-indigo-600">{user.firstName} {user.lastName}</span></h1>
                            <p className="text-gray-600 mt-2">Welcome to our dashboard! You can find the details of the scheduled appointments of our Lawyers below.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-around w-full md:w-1/3 mt-4 md:mt-0">
                        <div className="bg-indigo-500 text-white rounded-md mb-4 md:mb-0 md:mr-4 w-full h-32 md:h-48 flex flex-col items-center justify-center text-center">
                            <h2 className="text-lg">Total Appointments</h2>
                            <p className="text-2xl">1500</p>
                        </div>
                        <div className="bg-pink-500 text-white rounded-md mb-4 md:mb-0 md:mr-4 w-full h-32 md:h-48 flex flex-col items-center justify-center text-center">
                            <h2 className="text-lg">Registered Lawyers</h2>
                            <p className="text-2xl">20</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Appointments</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Client</th>
                                <th className="py-2">Date</th>
                                <th className="py-2">Lawyer</th>
                                <th className="py-2">Department</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Visited Before</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.length > 0 ? (
                                appointments.map(appointment => (
                                    <tr key={appointment._id} className="text-center">
                                        <td className="py-2">{appointment.firstName} {appointment.lastName}</td>
                                        <td className="py-2">{appointment.appointment_date}</td>
                                        <td className="py-2">{appointment.lawyer.firstName} {appointment.lawyer.lastName}</td>
                                        <td className="py-2">{appointment.department}</td>
                                        <td className="py-2">
                                            <select
                                                className={`px-2 py-1 rounded ${appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        appointment.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                            'bg-red-100 text-red-700'
                                                    }`}
                                                value={appointment.status}
                                                onChange={(e) => {
                                                    handleUpdateStatus(appointment._id, e.target.value)
                                                }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Accepted">Accepted</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="py-2 text-center">
                                            {appointment.hasVisited ? <FaCircleCheck className="text-green-500 mx-auto" /> : <FaCircleXmark className="text-red-500 mx-auto" />}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">No Appointments Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
